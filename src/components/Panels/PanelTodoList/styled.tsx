import { styled } from '@mui/material';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

export const StylesDatePicker = styled(DateRangePicker)(() => ({
  border: 0,
  '& .MuiTypography-root': {
    'margin-left': 0,
  },
  '& .MuiInputBase-input': {
    padding: 8,
    width: 80,
  },
  '& .css-wb57ya-MuiFormControl-root-MuiTextField-root"': {
    'margin-right': 0,
  },
}));
