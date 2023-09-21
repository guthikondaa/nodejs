import React from 'react'
import { FormControl, FormControlLabel, Checkbox as MuiCheckbox } from '@material-ui/core';

export default function Checkbox(props) {

    const { name, label, checked, onChange } = props;

    const convertToTarget = (name, value) => ({
        target: {
            name, value
        }
    })

    return (
        <FormControl>
            <FormControlLabel
                control={<MuiCheckbox
                    name={name}
                    color="primary"
                    checked={checked}
                    onChange={e => onChange(convertToTarget(name, e.target.checked))}
                />}
                label={label}
            />
        </FormControl>
    )
}