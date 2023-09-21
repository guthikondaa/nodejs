import React from 'react'
import { TextField, FormHelperText } from "@material-ui/core";
import PropTypes from 'prop-types';

export default function CustomTextField(props) {

    const { name, label, value, error = null, onChange = null, variant, type, errorMessage = "", maxLength = 50, minLength = 5, color = "primary", size = "small", validation = false, onBlur = null, blur = false } = props;

    return (
        <>
            <TextField
                variant={variant}
                label={label}
                name={name}
                value={value}
                onChange={onChange}
                color={color}
                fullWidth
                size={size}
                {...blur && { onBlur: (e) => onBlur(e) }}
                type={type}
                error={error}
                {
                ...validation && {
                    inputProps: {
                        maxLength: maxLength,
                        minLength: minLength
                    }
                }
                }

            />
            {
                error ? (
                    <FormHelperText error id="standard-weight-helper-text" >
                        {errorMessage}
                    </FormHelperText>
                ) : (
                    ""
                )
            }
        </>
    )
}

CustomTextField.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    variant: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
}