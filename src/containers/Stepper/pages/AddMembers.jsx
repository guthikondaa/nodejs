import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Tooltip, Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Controls from "../../../components/common/Controls";
import { useForm } from "../../../components/common/useForm";
import Typography from "@material-ui/core/Typography";
import { addMember } from "../../../state/actions/projectOnboardingActions";
import Demo from "../../../utils/Demo.csv";
import CSVFileReaderButton from "./CSVFileReaderButton";
import Avatar from "react-avatar";
import InfoIcon from "@material-ui/icons/Info";
import { optionsUpdated, getRolesCollection } from "../../../utils/mock";
import { getUsers } from "../../../state/actions/userAction";
import { InsertChartTwoTone } from "@material-ui/icons";
import { getToolRoles } from "../../../state/actions/toolRoleActions";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      minWidth: "100%",
    },
    backgroundColor: "#ffffff",
    margin: "0 auto",
    padding: theme.spacing(1.9),
    container: {
      backgroundColor: "white",
      marginBottom: "1%",
    },
    display: "flex",
    flexWrap: "wrap",
    flexGrow: 1,
  },
  button: {
    marginTop: 9,
    height: 37,
    color: "#53526E",
    backgroundColor: "#F5F6F8",
    textTransform: "none",
    fontWeight: "bold",
  },
  help: {
    color: "#434343",
  },
  autocomplete: {
    marginTop: theme.spacing(0.9),
  }
}));

const AddMembers = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  // users
  const users = useSelector(state => state?.usersData);
  const [usersData, setUsersData] = useState(users);
  let tools = useSelector((state) => state?.projectOnboarding?.definition?.tools);
  const membersRole = useSelector((state) => state?.toolRoleReducer?.data);

  const [role, setRole] = useState([]);

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("username" in fieldValues)
      temp.username = fieldValues.username ? "" : "This field is required.";
    if ("rolesData" in fieldValues)
      temp.roles = fieldValues.rolesData ? "" : "This field is required.";
    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  useEffect(() => {
    const roleData = [];
    membersRole?.map((member, i) => {
      roleData?.push({ id: i, title: member.role_master })
    })
    setRole(roleData);
  }, [])

  const initialFValues = {
    username: "",
    roles: [],
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } = useForm(initialFValues, true, validate);

  const members = useSelector((state) => state.projectOnboarding.definition.members)
  const handleDisableOption = ({ email }) => { if (members.find((user => email === user.email))) { return true } }

  const handleSubmit = (e) => {
    e.preventDefault();
    const keys = Object.keys(tools)
    const toolsTrue = keys.filter((key) => tools[key] === true)

    if (validate()) {
      const payload = {
        email: values.username.email,
        name: values.username.name,
        roles: values.roles,
      }
      toolsTrue.map((item) => {
        payload[item] = true
      });
      // trimming tableData from Payload.
      delete payload["tableData"];
      dispatch(addMember(payload));
      setUsersData(usersData.filter((item) => item?.email !== values?.username?.email));
      resetForm();
    }
  };
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
  const onDemoOpen = () => {
    window.open(Demo);
  };

  return (
    <div className={classes.root}>
      <Typography variant="body1" gutterBottom={true}>
        Who Can Access ?
      </Typography>
      <Grid container xs={12} sm={12} lg={12} spacing={1}>
        <Grid item xs={12} sm={12} md={12} lg={7}>
          <Grid container xs={12} sm={12} md={12} lg={12} spacing={1}>
            <Grid item xs={12} sm={7} md={7} lg={7}>
              <Controls.Autocomplete
                className={classes.autocomplete}
                label="Username"
                name="username"
                size="small"
                color="secondary"
                getOptionLabel={true}
                noOptionsText={"No Member found!!"}
                renderOption={true}
                handleChange={(event) => handleInputChange(event)}
                options={usersData}
                renderOptions={(items) => renderOptions(items)}
                error={errors.username}
                variant="outlined"
                getOptionLabelFunc={(option) => handleOptionLabel(option)}
                getOptionDisabled={(option) => handleDisableOption(option)}
              />
            </Grid>

            <Grid item xs={5} sm={5} md={5} lg={5}>
              <Controls.CustomSelect
                placeholder="Roles"
                label="Roles"
                name="roles"
                variant="outlined"
                color="primary"
                value={values.roles}
                onChange={(event) => handleInputChange(event)}
                options={role}
                error={errors.roles}
                data-testid="submitBtn"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={5}>
          <Grid container lg={12} spacing={1}>
            <Grid item lg={5}>
              <Tooltip title="Add Single User">
                <Button
                  variant="outlined"
                  onClick={handleSubmit}
                  className={classes.button}
                >
                  Add Member
                </Button>
              </Tooltip>
            </Grid>

            <Grid item lg={3}>
              <Tooltip title="View CSV template">
                <InfoIcon
                  className={classes.help}
                  onClick={() => {
                    onDemoOpen();
                  }}
                />
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default AddMembers;
