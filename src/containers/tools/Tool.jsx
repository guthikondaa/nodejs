import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MaterialTable from "material-table";
import {
  getTools,
  addTools,
  editTool,
  deleteTool,
  addTool
} from "../../state/actions/toolActions";
import { Delete, Edit, SearchRounded } from "@material-ui/icons";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import { getSCM, getCICD, getTool, getProjectManagement, getCommunication } from '../../utils/mock'
import Controls from '../../components/common/Controls';
import { checkSpecialChar, checkUrl } from "../../utils/functions";
import Button from "@material-ui/core/Button"
import SpeedIcon from "@material-ui/icons/Speed";
import { jiraTest } from "../../api/tool";

const theme = createTheme({
  shadows: ["none"]
});

function Tool() {
  const toolsData = useSelector(state => state.toolReducer.data);
  const [data, setData] = useState([toolsData]);
  const [selectedRows, setSelectedRows] = useState([]);
  const dispatch = useDispatch();

  const [iserror, setIserror] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const [options, setOptions] = useState([]);
  // const [validation, setValidation] = useState(false)

  useEffect(() => {
    dispatch(getTools());
  }, []);

  useEffect(() => {
    setData(toolsData)
  }, [toolsData])

  const columns = [
    {
      title: "Category Name",
      field: "toolCategoryName",
      editComponent: x => (
        <Controls.Select
          label="Select Category Name"
          name="toolCategoryName"
          variant="outlined"
          color="primary"
          value={x.value}
          onChange={e => {
            if (e.target.value === "Source Code Management") {
              setOptions(getSCM);
            }
            if (e.target.value === "CI-CD") {
              setOptions(getCICD);
            }
            if (e.target.value === "Project Management") {
              setOptions(getProjectManagement);
            }
            if (e.target.value === "Communication") {
              setOptions(getCommunication);
            }
            x.onChange(e.target.value);
          }}
          options={getTool}
          // error={errors.roles}
        />
      ),
      validate: rowData => {
        if (
          rowData.toolCategoryName === undefined ||
          rowData.toolCategoryName === ""
        ) {
          return "Required";
        }
        return true;
      }
    },

    {
      title: "Name",
      field: "toolName",
      editComponent: x => (
        <Controls.Select
          label="Select Tool"
          name="toolName"
          variant="outlined"
          color="primary"
          value={x.value}
          onChange={e => {
            x.onChange(e.target.value);
          }}
          options={options}
        />
      ),
      validate: rowData => {
        if (rowData.toolName === undefined || rowData.toolName === "") {
          return "Required";
        }
        return true;
      }
    },

    {
      title: "Instance Name",
      field: "instanceName",

      validate: rowData => {
        if (checkSpecialChar(rowData.instanceName)) {
          return "Special character is not allowed";
        }
        if (rowData.instanceName === undefined || rowData.instanceName === "") {
          return "Required";
        }
        if (rowData.instanceName.length < 5) {
          return "Minimum Length is 5";
        }
        if (rowData.instanceName.length > 50) {
          return "Maximum Length is 50";
        }
        if (rowData.instanceName === rowData.host) {
          return "Error: Cannot be same as Host";
        }
        if (rowData.instanceName === rowData.token) {
          return "Error: Cannot be same as Token";
        } else {
          return true;
        }
      }
    },

    {
      title: "Host",
      field: "host",
      validate: rowData => {
        if (rowData.host === undefined || rowData.host === "") {
          return "Required";
        }
        if (checkUrl(rowData.host)) {
          return "Please provide valid URL";
        }
        if (rowData.host === rowData.instanceName) {
          return "Error: Cannot be same as Instance Name";
        }
        if (rowData.host === rowData.token) {
          return "Error: Host cannot be same as Token";
        }
        return true;
      }
    },

    {
      title: "Token",
      field: "token",
      validate: rowData => {
        if (rowData.token === undefined || rowData.token === "") {
          return "Required";
        }
        if (rowData.token === rowData.instanceName) {
          return "Error: Cannot be same to Instance name";
        }
        if (rowData.token === rowData.host) {
          return "Error: Cannot be same as Host";
        }
        return true;
      }
    },

    {
      title: "Test",
      field: "test",
      render: rowData => (
        <Button disabled variant="outlined" size="small">
          <SpeedIcon />
        </Button>
      ),
      editable: "always",
      readonly: true,
      editComponent: props => {
        return (
          <Button
            variant="outlined"
            size="small"
            onClick={() => handleTest(props)}
          >
            <SpeedIcon />
          </Button>
        );
      },
      // validate: rowData => {
      //   return validation;
      // }
    }
  ];

  const handleTest = async (props) =>
  {
    const payload = {
      host : props?.rowData?.host,
      token :props?.rowData?.token
    }
    const result = await jiraTest(payload)
    // setValidation(result);
  }

  const handleRowUpdate = (newData, oldData, resolve) => {
    try
    {
      // setValidation(false);
      const data = {
        toolCategoryName: newData.toolCategoryName,
        toolName: newData.toolName,
        instanceName: newData.instanceName,
        host: newData.host,
        token: newData.token
      };
      dispatch(editTool(oldData.toolCategoryName, data));
      setTimeout(() => {
        dispatch(getTools());
      }, 1000);
      resolve();
      setIserror(false);
      setErrorMessages([]);
    } catch {
      setErrorMessages(["Update failed! Server error"]);
      setIserror(true);
      resolve();
    }
  };

  const handleRowAdd = (newData, resolve) => {
    try
    {
      // setValidation(false);      
      dispatch(addTool(newData));
      setTimeout(() => {
        dispatch(getTools());
      }, 1000);
      resolve();
      setErrorMessages([]);
      setIserror(false);
    } catch (error) {
      console.log(error);
      setErrorMessages(["Cannot add data. Server error!"]);
      setIserror(true);
      resolve();
    }
  };

  const handleRowDelete = async (oldData, resolve) => {
    try
    {
      dispatch(deleteTool(oldData.toolCategoryName));
      setTimeout(() => {
        dispatch(getTools());
      }, 1000);
      resolve();
    } catch (error) {
      setErrorMessages(["Delete failed! Server error"]);
      setIserror(true);
      resolve();
    }
  };

  return (
    <div style={{ marginRight: 50 }}>
      <MuiThemeProvider theme={theme}>
        <MaterialTable
          title="Tools Configuration"
          data={data}
          columns={columns}
          icons={{
            Delete: React.forwardRef((props, ref) => (
              <Delete style={{ color: "#FF0000" }} {...props} ref={ref} />
            )),
            Search: React.forwardRef((props, ref) => (
              <SearchRounded
                style={{ color: "#ffbb91", justifyContent: "flex-start" }}
                {...props}
                ref={ref}
              />
            )),
            Edit: React.forwardRef((props, ref) => (
              <Edit style={{ color: "#0000CD" }} {...props} ref={ref} />
            )),
            ResetSearch: () => <></>
          }}
          localization={{
            body: {
              emptyDataSourceMessage: "No Records",
              filterRow: {
                filterTooltip: "Filter"
              }
            },
            toolbar: {
              searchPlaceholder: "Search Tools"
            }
          }}
          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise(resolve => {
                handleRowUpdate(newData, oldData, resolve);
              }),
            onRowAdd: newData =>
              new Promise(resolve => {
                handleRowAdd(newData, resolve);
              }),
            onRowDelete: oldData =>
              new Promise(resolve => {
                handleRowDelete(oldData, resolve);
              })
          }}
          onSelectionChange={rows => setSelectedRows(rows)}
          options={{
            searchFieldVariant: "outlined",
            marginTop: 10,
            pageSize: 7,
            padding: "dense",
            pageSizeOptions: [7],
            emptyRowsWhenPaging: false,
            paging: true,
            actionsColumnIndex: -1,
            addRowPosition: "first",
            headerStyle: {
              backgroundColor: "#FFFF",
              fontWeight: "bold"
            },
            actionsColumnIndex: -1,
            addRowPosition: "first",
            searchFieldStyle: {
              backgroundColor: "rgb(250, 250, 250)",
              marginTop: 2,
              width: 210,
              height: 40,
              borderRadius: 12
            }
          }}
          actions={[]}
        />
      </MuiThemeProvider>
    </div>
  );
}

export default Tool;
