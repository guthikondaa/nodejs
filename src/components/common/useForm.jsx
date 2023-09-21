import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";

export function useForm(initialFValues, validateOnChange = false, validate) {
  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    let name = "";
    let value = "";
    if (
      (e.target.classList && e.target.classList[0] === "MuiBox-root") ||
      e.target.className === "MuiAutocomplete-option"
    ) {
      name = "username";
      if (e.target.className === "MuiAutocomplete-option") {
        value = e.target.innerText.split("\n")[1];
      } else {
        value = e.target.innerText;
      }
    } else {
      name = e.target.name;
      value = e.target.value;
    }
    setValues({
      ...values,
      [name]: value,
    });

    if (validateOnChange) validate({ [name]: value });
  };

  const resetForm = () => {
    setValues(initialFValues);
    setErrors({});
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(1),
    },
  },
}));

export function Form(props) {
  const classes = useStyles();
  const { children, ...other } = props;
  return (
    <form className={classes.root} autoComplete="off" {...other}>
      {props.children}
    </form>
  );
}

useForm.propTypes = {
  initialFValues: PropTypes.shape({
    username: PropTypes.string,
    roles: PropTypes.string,
  }),
  validateOnChange: PropTypes.bool,
  validate: PropTypes.func,
};
