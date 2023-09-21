import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { Grid, Hidden } from "@material-ui/core";
import oneClickLogin from "../../assets/images/one-click.svg";
import { LOGIN_SUCCESS } from "../../state/actions/types";
import { useForms } from "../../components/common/useForms";
import { useEffect } from "react";
import { setUserName } from "../../state/actions/loginAction";
import axios from "axios";
import { API_CHATBOT_SERVER_INSTANCE } from "../../config";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#ffffff",
    overflowY: "hidden",
  },
  gridContainer: { height: "100vh" },

  image: {
    height: "102%",
    position: "absolute",
    bottom: 0,
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    maxWidth: "640px",
    margin: "0 auto",
  },
  form: {
    width: "80%",
  },
  submit: {
    margin: theme.spacing(3, 0, 3),
    padding: theme.spacing(2),
  },
  link: {
    color: "inherit",
    textDecoration: "inherit",
  },
  stack: {
    zIndex: 1,
  },
}));

export default function Login() {
  const classes = useStyles();
  let history = useHistory();
  const dispatch = useDispatch();
  const { register } = useForm();
  const { isAuthenticated } = useSelector((state) => ({
    isAuthenticated: state.authentication.isAuthenticated,
  }));

  const [loginForm, setLoginForm] = useState({ userName: "", password: "" });

  const handleChange = (prop) => (event) => {
    setLoginForm({ ...loginForm, [prop]: event.target.value });
  };

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("userName" in fieldValues)
      temp.userName = fieldValues.userName ? "" : "This field is required.";
    if ("password" in fieldValues)
      temp.password = fieldValues.password ? "" : "This field is required.";
    setErrors({
      ...temp,
    });
    return Object.values(temp).every((x) => x === "");
  };

  const initialFValues = {
    userName: "",
    password: "",
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForms(initialFValues, true, validate);

  let userNAME = values.userName;

  const onSubmit = async (data) => {
    data.preventDefault();
    // if(validate()){
    //   dispatch({
    //     type: LOGIN_SUCCESS
    //   });
    // }
    const user = userNAME.charAt(0).toUpperCase() + userNAME.slice(1);
    
    if (validate()) {
      dispatch(setUserName(user));
      dispatch({ type: LOGIN_SUCCESS });
    }

    const res = await axios.post(
      API_CHATBOT_SERVER_INSTANCE + "chatbot/userName",
      { userName: user }
    );

    history.push("/projects");
  };
  if (isAuthenticated) {
    history.replace("/projects");
  }

  return (
    <div className={classes.root}>
      <Grid container className={classes.gridContainer}>
        <Hidden smDown>
          <Grid item md={4} className={classes.gridImage}>
            <img
              src={oneClickLogin}
              alt="One Click onboarding page"
              className={classes.image}
            />
          </Grid>
        </Hidden>
        <Grid item xs={12} md={8} lg={8} xl={8}>
          <div className={classes.paper}>
            <Typography component="h1" variant="h5" className={classes.stack}>
              Login to your Account
            </Typography>
            <form className={classes.form}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                required="required"
                id="userName"
                label="UserName"
                placeholder="Username"
                value={values.userName}
                name="userName"
                autoComplete="userName"
                autoFocus
                onChange={(event) => handleInputChange(event)}
                error={errors.userName}
              />

              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                required="required"
                name="password"
                label="Password"
                placeholder="Enter Password"
                type="password"
                id="password"
                value={values.password}
                autoComplete="current-password"
                onChange={(event) => handleInputChange(event)}
                error={errors.password}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disableElevation
                onClick={onSubmit}
              >
                Login
              </Button>
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
