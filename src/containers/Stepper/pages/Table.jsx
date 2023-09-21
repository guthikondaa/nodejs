import React, { useState, useEffect } from 'react'
import MaterialTable, { MTableToolbar } from 'material-table'
import { useDispatch, useSelector } from "react-redux";
import { deleteMember, editMember } from '../../../state/actions/projectOnboardingActions';
import Avatar from 'react-avatar';
import { makeStyles } from '@material-ui/core';
import { Delete, Edit, SearchRounded } from "@material-ui/icons";
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import { Grid, Divider, Box, Paper } from '@material-ui/core';
import Controls from "../../../components/common/Controls";
import AddMembers from './AddMembers';
import { Chip } from "@material-ui/core";
import { getRolesCollection, toolsConfigured } from '../../../utils/mock';
import { tools } from '../../../utils/mock';
import { getTools } from '../../../state/actions/toolActions';
import { Capitalize } from '../../../utils/functions';
import { getToolRoles } from '../../../state/actions/toolRoleActions';

const useStyles = makeStyles((theme) => ({
    rootTable: {
        display: "flex",
        flexWrap: 1,
        flexGrow: 1,
        "& > *": {
            backgroundColor: "transparent",
            width: "100%",
            margin: "0px auto",
            height: "100%",
        },
    },

}));

const theme = createTheme({
    shadows: ["none"],
    overrides: {
        MuiInput: {
            underline: {
                "&&&:after": {
                    borderColor: "red",
                },
            },
        },
    },
    palette: {
        primary: {
            main: '#ff9c6e',
        },
        secondary: {
            main: '#ff9c6e',
        },
    },
});

const Table = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const tools = useSelector((state) => state?.projectOnboarding?.definition?.tools);
    const membersRole = useSelector((state) => state?.toolRoleReducer?.data);

    const [toolSelected, setToolSelected] = useState([]);
    const [column, setColumn] = useState([]);
    const roleData = {};

    useEffect(() => {
        dispatch(getToolRoles())
    }, []);

    useEffect(() => {
        membersRole?.map((member, i) => {
            roleData[`${member.role_master}`] = member.role_master
        })
    }, [membersRole])

    useEffect(() => {
        const keys = Object.keys(tools)
        const toolsTrue = keys.filter((key) => tools[key] === true)
        setToolSelected(toolsTrue);
        const data = []
        const avatar = {
            title: "Name", field: 'email', editable: "never",
            render: (rowData) => <Box width="200px" height="10px" display="flex" alignItems="center" justifyContent="center">
                <Box width="40px"
                    marginRight='8px'><Avatar
                        maxInitials={1}
                        size={35}
                        round={true}
                        name={rowData === undefined ? " " : rowData.email}
                    />
                </Box>
                <Box width="140px">
                    <Box fontSize="15px" fontWeight="10px" color="#434343">{rowData.name}</Box>
                    <Box marginTop="3px" fontSize="12px" color="#5E6C84">{rowData.email}</Box>
                </Box>
            </Box>
        }
        data.push(avatar);

        const role = {
            title: "Role",
            field: "roles",
            render: (rowdata) => (
                <Chip label={rowdata.roles} />
            ),
            lookup: roleData
        }

        data.push(role)

        toolsTrue.map((tool) => {
            const value = {
                title: Capitalize(tool),
                field: tool,
                hidden: false,
                editComponent: (props) => {
                    return (
                        <input
                            type="checkbox"
                            checked={props.value}
                            onChange={(e) => props.onChange(e.target.checked)}
                        />
                    );
                },
                render: (rowdata) => (
                    <input type="checkbox" checked={rowdata[`${tool}`]} readOnly />
                )
            }
            data.push(value)
        })
        setColumn(data);
    }, [tools])

    const members = useSelector((state) => state.projectOnboarding.definition.members);

    return (
        <div className={classes.rootTable}>
            <MaterialTable
                columns={column}
                data={members}
                options={{
                    pageSize: 2,
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

                components={{
                    Toolbar: (props, ref) =>
                    (
                        <Grid container xs={12} sm={12} md={12} lg={12} style={{ backgroundColor: "#FFF", display: "flex", alignItems: "center", flexWrap: "wrap", flexGrow: 1 }}>
                            <Grid item xs={12} sm={12} md={12} lg={9}>
                                <AddMembers />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={3} style={{ height: "100%", marginTop: "auto", padding: 0 }}>
                                <MuiThemeProvider theme={theme}>
                                    <MTableToolbar {...props} />
                                </MuiThemeProvider>
                            </Grid>
                        </Grid>
                    ),
                    Container: props => <Paper {...props} elevation={0} />
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
                    onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                            dispatch(deleteMember(oldData.tableData.id))
                            setTimeout(() => {
                                resolve();
                            }, 3000);
                        }),

                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                const editData = {
                                    "roles": newData.roles,
                                    "jira": newData.jira,
                                    "bitbucket": newData.bitbucket,
                                    "teams": newData.teams,
                                    "jenkins": newData.jenkins,
                                    "col_id": oldData.tableData.id,
                                }
                                dispatch(editMember(JSON.stringify(editData)))
                                resolve();
                            }, 1000)
                        }),
                }}

                localization={{
                    body: {
                        emptyDataSourceMessage: 'No members to display',
                        filterRow: {
                            filterTooltip: 'Filter'
                        }
                    },
                    toolbar: {
                        searchPlaceholder: "Search Member",
                    }
                }}
            />
        </div>
    )
}

export default Table;
