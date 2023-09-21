/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function AutocompleteSearch({
    name,
    label,
    value,
    className,
    options,
    handleChange,
    size,
}) {
    const convertToDefEventPara = (name, value) => ({
        target: {
            name, value
        }
    })

    return (
        <div style={{ width: 300 }}>
        <Autocomplete
            freeSolo
            id="free-solo-2-demo"
            name={name}
            className={className}
            label={label}
            value={value}
            autoSelect
            disableClearable
            size={size}
            options={options}
            onChange={(e, data) => handleChange(convertToDefEventPara(name, data))}
            renderInput={(params) => (
                <TextField
                {...params}
                label={label}
                margin="normal"
                variant="outlined"
                InputProps={{ ...params.InputProps, type: 'search' }}
            />
            )}
        />
        </div>
    );
}