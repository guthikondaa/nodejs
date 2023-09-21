import { useDispatch, useSelector } from 'react-redux';
import { Delete, Edit, SearchRounded } from "@material-ui/icons";
import { addToolRoles, editToolRoles, deleteToolRoles, getToolRoles } from "../../state/actions/toolRoleActions";
import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'
import { makeStyles } from '@material-ui/core';
import Controls from '../../components/common/Controls';
import { Bitbucket, Jira, Jenkins, Teams, role_master } from '../../utils/mock';
import { Chip } from "@material-ui/core";
import { getTools } from "../../state/actions/toolActions";
import { Grid, Button, TextField, Typography, Divider, Box } from '@material-ui/core';
import { tools } from '../../utils/mock';
import CustomTextField from '../../components/common/CustomTextField';
import { Capitalize } from '../../utils/functions';

const useStyles = makeStyles((theme) => ({
    rootTable: {
        display: "flex",
        flexWrap: 1,
        flexGrow: 1,
        "& > *": {
            backgroundColor: "transparent",
            width: "90%",
            margin: "0px auto",
            height: "100%",
        },
    },

}));

const RoleMaster = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const userData = useSelector((state) => state?.toolRoleReducer?.data);
    const tools = useSelector((state) => state?.toolReducer?.data);
    const toolsMock = {
        jira: Jira,
        bitbucket: Bitbucket,
        jenkins: Jenkins
    };
    const [iserror, setIserror] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);
    const [column, setColumn] = useState([]);

    useEffect(() => {
        const toolRender = [];
        tools.map((tool) => {
            toolRender.push(tool?.toolName?.toLowerCase());
        });

        const data = [];
        const role = {
            title: "Role",
            field: "role_master",
            cellStyle: {
                color: '#434343',
                fontSize: "15px",
                borderRadius: "100",
                variant: "outlined",
            },
            editComponent: x => (
                <CustomTextField
                    name="Role"
                    value={x.value}
                    maxLength={50}
                    minLength={5}
                    required={true}
                    validation={true}
                    blur={false}
                    onChange={e => {
                        x.onChange(e.target.value);
                    }}
                    variant="outlined"
                    color="primary"
                    size="small"
                />
            ),
        }
        data.push(role);

        toolRender.map((tool) => {
            const toolData = {
                title: Capitalize(tool),
                field: tool,
                cellStyle: {
                    color: '#434343',
                    fontSize: "20px",
                    borderRadius: "100",
                    variant: "outlined",
                },
                render: (rowData) => (
                    < div >
                        {
                            rowData[tool].map((item) => (
                                <Chip key={item} label={item} />
                            ))
                        }
                    </div >
                ),

                editComponent: x => (
                    <Controls.Autocomplete
                        label={tool}
                        name={tool.toLowerCase()}
                        required={true}
                        multiple={true}
                        getOptionLabel={false}
                        noOptionsText={"No Tools found!!"}
                        renderOption={false}
                        options={toolsMock[tool]}
                        value={x.value}
                        handleChange={e => {
                            x.onChange(e.target.value);
                        }}
                        variant="outlined"
                        color="primary"
                        size="small"
                    />
                ),

            }
            data.push(toolData);
        });
        setColumn(data);
    }, [tools]);

    useEffect(() => {
        dispatch(getTools());
        dispatch(getToolRoles())
    }, [])

    const handleRowAdd = (newData, resolve) => {
        try {
            dispatch(addToolRoles(newData));
            setTimeout(() => {
                dispatch(getToolRoles())
            }, 1000)
            resolve();
        } catch (error) {
            console.log(error);
            resolve();
        }
    };

    const handleRowUpdate = (newData, oldData, resolve) => {
        try {
            delete newData['_id'];
            dispatch(editToolRoles(oldData.role_master, newData))
            setTimeout(() => {
                dispatch(getToolRoles())
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

    return (
        <div className={classes.rootTable}>
            <MaterialTable
                columns={column}
                data={userData}
                options={{
                    search: true,
                    searchFieldVariant: "outlined",
                    showTitle: false,
                    rowStyle: rowData => ({
                        backgroundColor: "#FAFBFC",
                        paddingTop: "1rem",
                        paddingBottom: "1rem",
                        fontSize: ".8125rem"
                    }),
                    headerStyle: {
                        backgroundColor: '#ffff',
                        color: "#5E6C84",
                        paddingLeft: 20,
                        paddingRight: 20,
                    },

                    actionsColumnIndex: -1,
                    addRowPosition: "first",
                    searchFieldStyle: {
                        backgroundColor: 'rgb(250, 250, 250)',
                        width: "210",
                        margin: "auto",
                        height: 40,
                        borderRadius: 12,
                    }
                }}


                icons={{
                    Delete: React.forwardRef((props, ref) => (
                        <Delete color="secondary" {...props} ref={ref} />
                    )),
                    Search: React.forwardRef((props, ref) => (
                        <SearchRounded style={{ color: "#ffbb91", justifyContent: "flex-start" }} {...props} ref={ref} />
                    )),
                    Edit: React.forwardRef((props, ref) => (
                        <Edit color="primary" {...props} ref={ref} />
                    )),
                    ResetSearch: () => <></>
                }}

                editable={{

                    onRowAdd: (newData) =>
                        new Promise((resolve) => {
                            handleRowAdd(newData, resolve);
                        }),

                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                handleRowUpdate(newData, oldData, resolve);
                                resolve();
                            }, 1000)
                        }),


                }}
                localization={{
                    body: {
                        emptyDataSourceMessage: 'No Tools to display :(',
                        filterRow: {
                            filterTooltip: 'Filter'
                        }
                    },
                    toolbar: {
                        searchPlaceholder: "Search Tools",
                    }
                }}

            />
        </div>
    )
}
export default RoleMaster;