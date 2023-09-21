import React from 'react'
import { FormControl, InputLabel, Select as MuiSelect, MenuItem, FormHelperText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(0.8),
    },
}));

export default function Select({ name, label, value, error = null, variant,onChange, options, placeholder, multiple = false }) {

    const classes = useStyles();

    return (
        <FormControl variant="outlined" className={classes.formControl}
            {...(error && { error: true })}>
            <InputLabel color="primary" >{label}</InputLabel>
            <MuiSelect
                className={classes.root}
                label={label}
                name={name}
                multiple={multiple}
                value={value}
                onChange={onChange}
                color={'primary'}
                placeholder={placeholder}
                variant={variant}
                size="small"

                style={{ height: 40, minWidth: 30 }}
            >
                <MenuItem value="">None</MenuItem>
                {
                    options.map(
                        item => (<MenuItem key={item.id} value={item.title}>{item.title}</MenuItem>)
                    )
                }
            </MuiSelect>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    )
}

Select.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    error: PropTypes.string,
    variant: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired,
    placeholder: PropTypes.string.isRequired,
}