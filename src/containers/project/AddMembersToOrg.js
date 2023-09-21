import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Avatar from "react-avatar";
import MaterialTable from "material-table";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";
import { addBulkApi, addMember, getUsers, editUser, deleteUser, addUser} from "../../state/actions/OrgActions";
import CloudUploadRoundedIcon from "@material-ui/icons/CloudUploadRounded";
import { Delete, Edit, SearchRounded } from "@material-ui/icons";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import {CamelCaseToString} from "../../utils/functions"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme)=>({
  rootTable: {
   width: "100%",           
  },

}));
const theme = createTheme({
  shadows: ["none"],
});

//Function User

function AddMembersToOrg() {
  const classes = useStyles();
  const userData = useSelector((state) => state?.users?.data);
  const [data, setData] = useState([userData]);
  const [selectedRows, setSelectedRows] = useState([]);
  const dispatch = useDispatch();

  //for error handling
  const [iserror, setIserror] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  useEffect(()=>{
    dispatch(getUsers())
  }, [])

  const columns = [
    {
      title: "Avatar",
      render: (rowData) => (
        <Avatar
          maxInitials={1}
          size={40}
          round={true}
          name={rowData === undefined ? " " : rowData.name}
        />
      ),
    },

    //name
    {
      title: "Name",
      field: "name",
      editable: (_, rowData) => (rowData?.status !== "active") | "onAdd",
      validate: (rowData) => {
        if (rowData.name === undefined || rowData.name === "") 
        {
            return "Required";
        }
        return true;
      },
    },

    //employee id
    {
      title: "Emp Id",
      field: "empID",
      validate: (rowData) => {
        if (rowData.empID === undefined || rowData.empID === "") {
          return "Required";
        }
        return true;
      },
    },

    //email
    {
      title: "Email",
      field: "email",
      validate: (rowData) => {
        if (rowData.email === undefined || rowData.email === "") {
          return "Required";
        } else if (!rowData.email.includes("@" && ".")) {
          return "Enter valid email address";
        }
        return true;
      },
    },

    //date
    {
      title: "Date",
      field: "date",
      type: "date",
      initialEditValue: new Date(),
      disabled: true,
      validate: (rowData) => {
        if (rowData.date === undefined || rowData.date === "") {
          return "Required";
        }
        return true;
      },
    },

    //designation
    {
      title: "Designation",
      field: "designation",
      lookup: { "Admin": "Admin", "Employee": "Employee", "OCPO User": "OCPO User", "developer": "developer" },
      editable: "onAdd",
      validate: (rowData) => {
        if (rowData.designation === undefined || rowData.designation === "") {
          return "Required";
        }
        return true;
      },
    },

    //status
    {
      title: "Status",
      field: "status",
      lookup: { inactive: "inactive", active: "active" },
      sorting: true,
      editable: (_, rowData) => (rowData?.status !== "active") | "onAdd",
      validate: (rowData) => {
        if (rowData.status === undefined || rowData.status === "") {
          return "Required";
        }
        return true;
      },
    },
  ];
  
  // RowUpdate
  const handleRowUpdate = (newData, oldData, resolve) => {
    try {
      const data = {
        "name": newData.name,
        "empID": newData.empID,
        "email": newData.email,
        "date": newData.date,
        "designation": newData.designation,
        "status": newData.status
      }
      dispatch(editUser(oldData.empID, data))
      setTimeout(()=>{
        dispatch(getUsers())
      }, 1000)
      resolve();
      setIserror(false);
      setErrorMessages([]);
    } catch {
      setErrorMessages(["Update failed! Server error"]);
      setIserror(true);
      resolve();
    }
  };

  //RowAdd
  const handleRowAdd = (newData, resolve) => {
    try {
      const name1 = newData.name;
      const name = CamelCaseToString(name1);
      newData.name = name;
      newData.empID= parseInt(newData.empID);
      dispatch(addUser(newData));
      setTimeout(()=>{
        dispatch(getUsers())
      }, 1000)
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

  //RowDelete

  const handleRowDelete = async (oldData, resolve) => {
    // dispatch(deleteMember(oldData.tableData.id));
    try {
      // const dataDelete = [...data];
      // const index = oldData.tableData.id;
      // dataDelete.splice(index, 1);
      // setData([...dataDelete]);
      dispatch(deleteUser(oldData.empID))
      setTimeout(()=>{
        dispatch(getUsers())
      }, 1000)
      resolve();
    } catch (error) {
      setErrorMessages(["Delete failed! Server error"]);
      setIserror(true);
      resolve();
    }
  };

  //bulkadd
  const addBulk = async (rowData) => {
    dispatch(addBulkApi(userData));
  };

  return (
     <div className={classes.rootTable}>      
         
          <MuiThemeProvider theme ={theme}>
            <MaterialTable
            
              title="Users"
              data={userData}
              columns={columns}
              icons={{
                Delete: React.forwardRef((props, ref) => (
                    <Delete  style={{color:"#FF0000"}} {...props} ref={ref} />
                )), 
                Search: React.forwardRef((props, ref) => (
                    <SearchRounded style={{ color: "#ffbb91", justifyContent: "flex-start"}} {...props} ref={ref} />
                )),
                Edit: React.forwardRef((props, ref) => (
                    <Edit style={{color:"#0000CD"}} {...props} ref={ref} />
                )),
                ResetSearch: ()=> <></>            
            }}
              localization={{
                body: {
                  emptyDataSourceMessage:
                    "No Records",
                  filterRow: {
                    filterTooltip: "Filter",
                  },
                },
                toolbar: {
                  searchPlaceholder: "Search User",
                },
              }}
              editable={{
                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve) => {
                    handleRowUpdate(newData, oldData, resolve);
                  }),
                onRowAdd: (newData) =>
                  new Promise((resolve) => {
                    handleRowAdd(newData, resolve);
                  }),
                onRowDelete: (oldData) =>
                  new Promise((resolve) => {
                    handleRowDelete(oldData, resolve);
                  }),
              }}
              onSelectionChange={(rows) => setSelectedRows(rows)}
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
                rowStyle: (rowData) => ({
                  backgroundColor:
                    rowData.status === "Inactive" ? "#EEE" : "#FFF",
                  ontSize: ".8125rem",
                }),
                headerStyle: {
                  backgroundColor: "#FFFF",
                  fontWeight: "bold",
                },
                actionsColumnIndex: -1,
                addRowPosition: "first",
                searchFieldStyle: {
                  backgroundColor: "rgb(250, 250, 250)",
                  marginTop:2,
                  width: 210,
                  height: 25,
                  borderRadius: 12,
                },
              }}
              
              actions={[
                {
                  icon: () => <CloudUploadRoundedIcon />,
                  tooltip: "Bulk Add",
                  onClick: (evt, data) => {
                    addBulk(data);
                  },
                  isFreeAction: true,
                   
                },
              ]}
            />
           </MuiThemeProvider>
       
    </div>
  );
}

export default AddMembersToOrg;
