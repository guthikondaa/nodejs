import React, { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom"
import { Grid, Button, TextField, Typography, Divider, Box } from '@material-ui/core';
import Controls from '../../../components/common/Controls';
import { Capitalize, checkSpecialChar, stringToCamelCase } from '../../../utils/functions';
import { Form } from '../../../components/common/useForm';
import { PROJECT_ONBOARD } from '../../../state/actions/types';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, createTheme } from "@material-ui/core/styles";
import Avatar from "react-avatar";
import { getUsers } from '../../../state/actions/userAction';
import CustomTextField from '../../../components/common/CustomTextField';
import { getTools } from "../../../state/actions/toolActions";
import { resetAsDraft } from '../../../state/actions/projectOnboardingActions';
import AutocompleteSearch from '../../../components/common/AutocompleteSearch';
import { Chip } from '@material-ui/core';

const theme = createTheme({
    shadows: ["none"],
    palette: {
        primary: {
            main: '#ff9c6e',
        },
        secondary: {
            main: '#ff9c6e',
        },
    },
});

const useStyles = makeStyles((theme) => ({
    autocomplete: {
        marginTop: theme.spacing(-1)
    }
}));

const Repos = []

const Definition = () => {
    const users = useSelector((state) => state?.usersData)
    const stateVal = useSelector(state => state?.projectOnboarding);
    const tools = useSelector((state) => state?.toolReducer?.data);
    const [dynamicTool, setDynamicTool] = useState([]);
    const bitbucketData = useSelector((state) => state?.toolReducer?.existingTools?.bitbucket);
    const jiraData = useSelector((state) => state?.toolReducer?.existingTools?.jira);
    const projectList = useSelector((state) => state?.projectDataReducer);
    const [filtered, setFiltered] = useState([])
    const [jiraFiltered, setJiraFiltered] = useState([]);

    useEffect(() => {
        setStateDefinition({
            ...stateDefinition,
            projectName: stateVal?.definition?.projectName,
            owner: stateVal?.definition?.owner,
            startDate: stateVal?.definition?.startDate,
            endDate: stateVal?.definition?.endDate,
            jiraboard: stateVal?.definition?.jira?.jiraboard,
            teamName: stateVal?.definition?.teams?.teamName,
            channelName: stateVal?.definition?.teams?.channelName,
            bitbucketName: stateVal?.definition?.bitbucket?.bitbucketName,
            repoName: stateVal?.definition?.bitbucket?.repoName,
            status: stateVal?.definition?.status,
            jira: stateVal?.definition?.tools?.jira,
            bitbucket: stateVal?.definition?.tools?.bitbucket,
            teams: stateVal?.definition?.tools?.teams,
            jenkins: stateVal?.definition?.tools?.jenkins
        });
        const toolRender = [];

        tools?.map((tool) => {
            toolRender.push(tool.toolName.toLowerCase());
        });

        setDynamicTool(toolRender);

    }, [stateVal]);

    useEffect(() => {
        const board = []
        jiraData?.map((jira) => {
            board.push(jira?.name);
        });
        setJiraFiltered(board);
    }, [jiraData])

    const dispatch = useDispatch();
    const [error, setError] = useState({
        projectName: false,
        teamName: false,
        channelName: false,
        jiraboard: false,
        bitbucketName: false,
        repoName: false
    })

    const [errorMessage, setErrorMessage] = useState({
        projectName: "",
        teamName: "",
        channelName: "",
        jiraboard: "",
        bitbucketName: "",
        repoName: ""
    })

    const classes = useStyles();

    const [stateDefinition, setStateDefinition] = useState({
        projectName: stateVal?.definition?.projectName,
        owner: stateVal?.definition?.owner,
        startDate: stateVal?.definition?.startDate,
        endDate: stateVal?.definition?.endDate,
        jiraboard: stateVal?.definition?.jira?.jiraboard,
        teamName: stateVal?.definition?.teams?.teamName,
        channelName: stateVal?.definition?.teams?.channelName,
        bitbucketName: stateVal?.definition?.bitbucket?.bitbucketName,
        repoName: stateVal?.definition?.bitbucket?.repoName,
        status: stateVal?.definition?.status,
        jira: stateVal?.definition?.tools?.jira,
        bitbucket: stateVal?.definition?.tools?.bitbucket,
        teams: stateVal?.definition?.tools?.teams,
        jenkins: stateVal?.definition?.tools?.jenkins
    });

    const renderOptions = ({ email, name }) => {
        return (
            <Box
                width="290px"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Box width="40px" marginRight="8px">
                    <Avatar
                        maxInitials={1}
                        size={35}
                        round={true}
                        name={name === undefined ? " " : name}
                    />
                </Box>
                <Box width="250px">
                    <Box
                        fontSize="16px"
                        fontWeight="10px"
                        color="#434343"
                    >{`${name} - ${email}`}</Box>
                </Box>
            </Box>
        );
    };
    const handleOptionLabel = (option) => { return (`${option.name} - ${option.email}`) }

    useEffect(() => {
        const data = [];
        bitbucketData?.map((item) => {
            data.push(item.project_name);
        })
        setFiltered(data);
    }, [bitbucketData]);

    const checkError = (name, value) => {
        switch (name) {
            case "projectName":
                return checkSpecialChar(value);
            default: return;
        }
    }

    const checkMinLength = (value) => {
        return value.length <= 5;
    }

    const checkMaxLength = (value) => {
        return value.length >= 50;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case "projectName":
                const isSpecialChar = checkError(name, value);
                if (isSpecialChar) {
                    setError({ ...error, projectName: isSpecialChar });
                    setErrorMessage({ ...errorMessage, projectName: "Project Name should not contain special character." })
                }
                const isMaxLength = checkMaxLength(value);
                if (isMaxLength) {
                    setError({ ...error, projectName: isMaxLength });
                    setErrorMessage({ ...errorMessage, projectName: "Project Name should be less than 50 characters" })
                }
                const isMinLength = checkMinLength(value)
                if (isMinLength) {
                    setError({ ...error, projectName: isMinLength });
                    setErrorMessage({ ...errorMessage, projectName: "Project Name should be greater than 5 characters" })
                }
                if (isSpecialChar === false && isMaxLength === false && isMinLength === false) {
                    setError({ ...error, projectName: false });
                    setErrorMessage({ ...errorMessage, projectName: "" })
                }
                setStateDefinition({ ...stateDefinition, projectName: value, teamName: value, bitbucketName: value, jiraboard: value });
                dispatch({
                    type: PROJECT_ONBOARD.BASIC_DETAILS.PROJECTNAME,
                    data: value
                })
                break;
            case "owner":
                setStateDefinition({ ...stateDefinition, owner: value })
                dispatch({
                    type: PROJECT_ONBOARD.BASIC_DETAILS.DEFINITION,
                    data: value,
                    apiName: "owner"
                })
                break;
            case "jira":
                setStateDefinition({ ...stateDefinition, jira: value })
                dispatch({
                    type: PROJECT_ONBOARD.BASIC_DETAILS.TOOLS,
                    data: value,
                    apiName: name
                })
                break;
            case "teams":
                setStateDefinition({ ...stateDefinition, teams: value })
                dispatch({
                    type: PROJECT_ONBOARD.BASIC_DETAILS.TOOLS,
                    data: value,
                    apiName: name
                })
                break;
            case "bitbucket":
                setStateDefinition({ ...stateDefinition, bitbucket: value })
                dispatch({
                    type: PROJECT_ONBOARD.BASIC_DETAILS.TOOLS,
                    data: value,
                    apiName: name
                })
                break;
            case "jenkins":
                setStateDefinition({ ...stateDefinition, jenkins: value })
                dispatch({
                    type: PROJECT_ONBOARD.BASIC_DETAILS.TOOLS,
                    data: value,
                    apiName: name
                })
                break;
            case "teamName":
                let isMaxLengthTeamName = checkMaxLength(value);
                if (isMaxLengthTeamName) {
                    setError({ ...error, teamName: isMaxLengthTeamName });
                    setErrorMessage({ ...errorMessage, teamName: "Team Name should be less than 50 characters" })
                }
                let isMinLengthTeamName = checkMinLength(value)
                if (isMinLengthTeamName) {
                    setError({ ...error, teamName: isMinLengthTeamName });
                    setErrorMessage({ ...errorMessage, teamName: "Team Name should be greater than 5 characters" })
                }
                if (isMaxLengthTeamName === false && isMinLengthTeamName === false) {
                    setError({ ...error, teamName: false });
                    setErrorMessage({ ...errorMessage, teamName: "" })
                }
                setStateDefinition({ ...stateDefinition, teamName: value })
                dispatch({
                    type: PROJECT_ONBOARD.BASIC_DETAILS.TEAMS,
                    data: value,
                    apiName: name,
                })
                break;
            case "channelName":
                let isMaxLengthChannelName = checkMaxLength(value);
                if (isMaxLengthChannelName) {
                    setError({ ...error, channelName: isMaxLengthChannelName });
                    setErrorMessage({ ...errorMessage, channelName: "Channel Name should be less than 50 characters" })
                }
                let isMinLengthChannelName = checkMinLength(value)
                if (isMinLengthChannelName) {
                    setError({ ...error, channelName: isMinLengthChannelName });
                    setErrorMessage({ ...errorMessage, channelName: "Channel Name should be greater than 5 characters" })
                }
                if (isMaxLengthChannelName === false && isMinLengthChannelName === false) {
                    setError({ ...error, channelName: false });
                    setErrorMessage({ ...errorMessage, channelName: "" })
                }
                setStateDefinition({ ...stateDefinition, channelName: value })
                dispatch({
                    type: PROJECT_ONBOARD.BASIC_DETAILS.TEAMS,
                    data: value,
                    apiName: name,
                })
                break;
            case "jiraboard":
                let isMaxLengthJiraBoard = checkMaxLength(value);
                if (isMaxLengthJiraBoard) {
                    setError({ ...error, jiraboard: isMaxLengthJiraBoard });
                    setErrorMessage({ ...errorMessage, jiraboard: "Jira Board should be less than 50 characters" })
                }
                let isMinLengthJiraBoard = checkMinLength(value)
                if (isMinLengthJiraBoard) {
                    setError({ ...error, jiraboard: isMinLengthJiraBoard });
                    setErrorMessage({ ...errorMessage, jiraboard: "Jira Board should be greater than 5 characters" })
                }
                if (isMaxLengthJiraBoard === false && isMinLengthJiraBoard === false) {
                    setError({ ...error, jiraboard: false });
                    setErrorMessage({ ...errorMessage, jiraboard: "" })
                }
                setStateDefinition({ ...stateDefinition, jiraboard: value })
                dispatch({
                    type: PROJECT_ONBOARD.BASIC_DETAILS.JIRA,
                    data: value,
                    apiName: name,
                })
                break;
            case "bitbucketName":
                let isMaxLengthBitbucketName = checkMaxLength(value);
                if (isMaxLengthBitbucketName) {
                    setError({ ...error, bitbucketName: isMaxLengthBitbucketName });
                    setErrorMessage({ ...errorMessage, bitbucketName: "Bitbucket Name should be less than 50 characters" })
                }
                let isMinLengthBitbucketName = checkMinLength(value)
                if (isMinLengthBitbucketName) {
                    setError({ ...error, bitbucketName: isMinLengthBitbucketName });
                    setErrorMessage({ ...errorMessage, bitbucketName: "Bitbucket Name should be greater than 5 characters" })
                }
                if (isMaxLengthBitbucketName === false && isMinLengthBitbucketName === false) {
                    setError({ ...error, bitbucketName: false });
                    setErrorMessage({ ...errorMessage, bitbucketName: "" })
                }
                dispatch({
                    type: PROJECT_ONBOARD.BASIC_DETAILS.BITBUCKET,
                    data: value,
                    apiName: name,
                })
                setStateDefinition({ ...stateDefinition, bitbucketName: value })
                break;
            case "repoName":
                let isMaxLengthRepoName = checkMaxLength(value);
                if (isMaxLengthRepoName) {
                    setError({ ...error, repoName: isMaxLengthRepoName });
                    setErrorMessage({ ...errorMessage, repoName: "Team Name should be less than 50 characters" })
                }
                let isMinLengthRepoName = checkMinLength(value)
                if (isMinLengthRepoName) {
                    setError({ ...error, repoName: isMinLengthRepoName });
                    setErrorMessage({ ...errorMessage, repoName: "Team Name should be greater than 5 characters" })
                }
                if (isMaxLengthRepoName === false && isMinLengthRepoName === false) {
                    setError({ ...error, repoName: false });
                    setErrorMessage({ ...errorMessage, repoName: "" })
                }
                setStateDefinition({ ...stateDefinition, repoName: value })
                dispatch({
                    type: PROJECT_ONBOARD.BASIC_DETAILS.BITBUCKET,
                    data: value,
                    apiName: name,
                })
                break;
            case "startDate":
                setStateDefinition({ ...stateDefinition, startDate: value })
                dispatch({
                    type: PROJECT_ONBOARD.BASIC_DETAILS.DEFINITION,
                    data: value,
                    apiName: "startDate"
                })
                break;
            case "endDate":
                setStateDefinition({ ...stateDefinition, endDate: value })
                dispatch({
                    type: PROJECT_ONBOARD.BASIC_DETAILS.DEFINITION,
                    data: value,
                    apiName: "endDate"
                })
                break;
            default:
                setStateDefinition({ ...stateDefinition, [name]: value });
        }
    }
    const handleDisableOption = ({ email }) => { if (stateDefinition.owner.find((user => email === user.email))) { return true } }

    const handleBlur = (e) => {
        const { name, value } = e.target;
        const found = projectList.some(el => el.projectName === value);
        if (found) {
            setError({ ...error, projectName: true });
            setErrorMessage({ ...errorMessage, projectName: "Project Name already exist" })
        } else {
            setError({ ...error, projectName: false });
            setErrorMessage({ ...errorMessage, projectName: "" })
        }
    }

    return (
        <Form>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Typography >Basic Details</Typography>
                    <Divider />
                </Grid>
                <Grid item xs={6}>
                    <CustomTextField
                        placeholder="Project Name"
                        label="Project Name"
                        name="projectName"
                        variant="outlined"
                        onChange={(e) => handleChange(e)}
                        value={stateDefinition?.projectName}
                        maxLength={50}
                        minLength={5}
                        color="primary"
                        size="small"
                        validation={true}
                        error={error.projectName}
                        onBlur={(e) => handleBlur(e)}
                        blur={true}
                        errorMessage={errorMessage.projectName}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controls.Autocomplete
                        label="Owner"
                        name="owner"
                        className={classes.autocomplete}
                        required={true}
                        renderOption={true}
                        getOptionLabel={true}
                        getOptionLabelFunc={(option) => handleOptionLabel(option)}
                        noOptionsText={"No Owner found!!"}
                        renderOptions={(items) => renderOptions(items)}
                        multiple={true}
                        value={stateDefinition?.owner}
                        handleChange={(e) => handleChange(e)}
                        options={users}
                        getOptionDisabled={(option) => handleDisableOption(option)}
                        variant="outlined"
                        color="primary"
                        size="small"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography >Select Tools</Typography>
                    <Divider />
                </Grid>
                {
                    dynamicTool?.map((tool) => {
                        return (
                            <Grid item xs={3}>
                                <Controls.Checkbox
                                    name={tool}
                                    label={Capitalize(tool)}
                                    checked={stateDefinition[`${tool}`]}
                                    onChange={(e) => handleChange(e)}
                                />
                            </Grid>
                        )
                    })
                }
                {
                    stateDefinition?.teams === true && (
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography variant="title1">Teams</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <CustomTextField
                                    name="teamName"
                                    label="Team Name"
                                    value={stateDefinition?.teamName}
                                    variant="outlined"
                                    maxLength={50}
                                    minLength={5}
                                    required={true}
                                    color="primary"
                                    size="small"
                                    validation={true}
                                    blur={false}
                                    onChange={e => handleChange(e)}
                                    error={error.teamName}
                                    errorMessage={errorMessage.teamName}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <CustomTextField
                                    name="channelName"
                                    label="Channel Name"
                                    value={stateDefinition?.channelName}
                                    variant="outlined"
                                    maxLength={50}
                                    minLength={5}
                                    required={true}
                                    color="primary"
                                    size="small"
                                    blur={false}
                                    validation={true}
                                    onChange={e => handleChange(e)}
                                    error={error.channelName}
                                    errorMessage={errorMessage.channelName}
                                />
                            </Grid>
                        </Grid>
                    )
                }
                {
                    stateDefinition?.jira === true && (
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography variant="title1">Jira</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <AutocompleteSearch
                                    label="Jira Board Name"
                                    name="jiraboard"
                                    className={classes.autocomplete}
                                    value={stateDefinition?.jiraboard}
                                    handleChange={(e) => handleChange(e)}
                                    options={jiraFiltered}
                                    size="small"
                                />
                            </Grid>
                        </Grid>
                    )
                }
                {
                    stateDefinition?.bitbucket === true && (
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography variant="title1">Bitbucket Details: </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <AutocompleteSearch
                                    label="Project Name"
                                    name="bitbucketName"
                                    className={classes.autocomplete}
                                    value={stateDefinition?.bitbucketName}
                                    handleChange={(e) => handleChange(e)}
                                    options={filtered}
                                    size="small"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Controls.Autocomplete
                                    multiple
                                    options={Repos}
                                    label="Repo Name"
                                    name="repoName"
                                    variant="outlined"
                                    maxLength={50}
                                    minLength={5}
                                    required={true}
                                    color="primary"
                                    size="small"
                                    validation={true}
                                    handleChange={e => handleChange(e)}
                                    error={error.repoName}
                                    errorMessage={errorMessage.repoName}
                                    freeSolo
                                    value={stateDefinition?.repoName}
                                    renderTags={(value, getTagProps) =>
                                        value.map((repoName, index) => (
                                            <Chip variant="outlined" label={repoName} {...getTagProps({ index })} />
                                        ))
                                    }
                                />
                            </Grid>
                        </Grid>
                    )
                }
                <Grid item xs={12}>
                    <Typography variant="title1">Duration</Typography>
                    <Divider />
                </Grid>
                <Grid item xs={6}>
                    <Controls.Datepicker
                        name="startDate"
                        label="Start Date"
                        format="MM/dd/yyyy"
                        size="small"
                        variant="outlined"
                        disablePast={true}
                        value={stateDefinition?.startDate}
                        required={true}
                        onChange={e => handleChange(e)}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controls.Datepicker
                        name="endDate"
                        label="End Date"
                        format="MM/dd/yyyy"
                        value={stateDefinition?.endDate}
                        required={true}
                        size="small"
                        variant="outlined"
                        minDate={stateDefinition.startDate}
                        onChange={e => handleChange(e)}
                    />
                </Grid>
            </Grid>
        </Form>
    )
}

export default Definition
