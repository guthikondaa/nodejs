import React from 'react'
import { FormControl, InputLabel, Select as MuiSelect, MenuItem, FormHelperText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
      marginTop: theme.spacing(0.8),
  },
}));

export default function Select(props) {
  const classes = useStyles();
    const { name, label, value,error=null, onChange, options, color, variant } = props;

    return (
        <FormControl variant={variant}
        {...(error && {error:true})}>
            <InputLabel color={color}>{label}</InputLabel>
            <MuiSelect
               className={classes.root}
                label={label}
                name={name}
                value={value}
                onChange={onChange}
                color={color}
                fullWidth
                style={{ height: 40, minWidth: 200 }}
                >
                <MenuItem value="">None</MenuItem>
                {
                    options &&
                        options.map((item) =>
                          typeof item === "object" ? (
                            <MenuItem value={item.title} key={item.title}>
                              {item.title}
                            </MenuItem>
                          ) : (
                            <MenuItem value={item} key={item}>
                              {item}
                            </MenuItem>
                          )
                    )
                }
            </MuiSelect>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    )
}