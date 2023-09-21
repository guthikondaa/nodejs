import React from 'react'
import { TextField } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import Controls from './Controls';

export default function Input(props) {



    const {

        name,

        label,

        value,

        error = null,

        onChange = null,

        variant,

        required = true,

        // type,

        ...other

    } = props;

    return (

        <TextField

            variant="outlined"

            label={label}

            name={name}

            value={value}

            onChange={onChange}

            fullWidth

            // type={type}

            size="small"

            required={required}

            {...other}

            {...(error && { error: true, helperText: error })}

        />

    )

}