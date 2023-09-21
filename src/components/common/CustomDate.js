import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export default function MaterialUIPickers({
    label,
    format,
    onChange=null,
    value,
    name,
    required,
    size,
    variant,
    disablePast=false,
    minDate
}) {
  
  
  const convertToDefEventPara = (name, value) => ({
    target: {
        name, value
    }
  })

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label={label}
          format={format}
          name={name}
          disablePast={disablePast}
          value={value}
          onChange={(e, date)=>onChange(convertToDefEventPara(name, date))}
          inputVariant={variant}
          size={size}
          required={required}
          minDate={minDate}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
    </MuiPickersUtilsProvider>
  );
}
