import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { FormControl, FormHelperText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

export default function AutoComplete({
    options,
    label,
    variant,
    handleChange,
    name,
    multiple,
    getOptionLabel,
    error = null,
    noOptionsText = "",
    renderOptions = null,
    renderOption = false,
    className,
    size,
    color,
    freeSolo,
    getOptionLabelFunc,
    value,
    ...restProps
}) {

    const convertToDefEventPara = (name, value) => ({
        target: {
            name, value
        }
    })

    return (
        <Autocomplete
            freeSolo
            id="auto-complete"
            className={className}
            options={options}
            {...getOptionLabel && { getOptionLabel: getOptionLabelFunc }}
            {...renderOption && { renderOption: (option) => renderOptions(option) }}
            name={name}
            value={value}
            multiple={multiple}
            onChange={(e, data) => handleChange(convertToDefEventPara(name, data))}
            noOptionsText={noOptionsText}
            {...restProps}
            renderInput={(params) =>
                <FormControl variant={variant}
                    {...(error && { error: true })}>
                    <TextField {...params} color={color} size={size} label={label} variant={variant} />
                    {error && <FormHelperText>{error}</FormHelperText>}
                </FormControl>
            }
        />
    );
}

AutoComplete.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    variant: PropTypes.string.isRequired,
    error: PropTypes.string,
    renderOptions: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
}