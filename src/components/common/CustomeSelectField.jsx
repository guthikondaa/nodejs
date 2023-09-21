import React from "react";
import { TextField, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  textSelect: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

// function compare(a, b) {
//   const nameA = a.name.toUpperCase();
//   const nameB = b.name.toUpperCase();

//   let comparison = 0;
//   if (nameA > nameB) {
//     comparison = 1;
//   } else if (nameA < nameB) {
//     comparison = -1;
//   }
//   return comparison;
// }

export default function CustomSelectTextField({
  placeholder,
  label,
  name,
  value,
  handleChange,
  items,
  disabled,
  multiple,
})
 {
  const classes = useStyles();
  return (
    <TextField
      className={classes.textSelect}
      disabled={disabled}
      variant="outlined"
      margin="normal"
      required
      fullWidth
      select={true}
      multiple={multiple}
      placeholder={placeholder}
      label={label}
      name={name}
      value={value}
      onChange={(e) => handleChange(e.target.value, name)}
    >
      {items
        ? items.map((item) => (
            <MenuItem value={item.name} key={item.name}>
              {item.displayName}
            </MenuItem>
          ))
        : ""}
    </TextField>
  );
}

