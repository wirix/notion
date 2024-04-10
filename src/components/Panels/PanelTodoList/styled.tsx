import { styled } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

export const StylesDatePicker = styled(DatePicker)(() => ({
  border: 0,
  '& .MuiOutlinedInput-notchedOutline': {
    border: 0,
  },
  '& .MuiInputBase-input': {
    padding: 1,
    pr: 0,
    width: 80,
  },
  '& .MuiButtonBase-root': {
    pl: 0,
  },
}));
