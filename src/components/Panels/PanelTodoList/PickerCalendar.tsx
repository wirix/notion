import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { StylesDatePicker } from '.';

export const PickerCalendar = ({
  date,
  id,
  updateStore,
  ...props
}: {
  date: Date;
  id: string;
  updateStore: (id: string, field: { date: Date }) => void;
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StylesDatePicker
        format="DD-MM-YYYY"
        value={dayjs(date)}
        onChange={(date) => {
          if (date) {
            // @ts-expect-error ts-migrate(2322) FIXME: Type 'Dayjs' is not assignable to type 'Date'.
            updateStore(id, { date: date.$d });
          }
        }}
        {...props}
      />
    </LocalizationProvider>
  );
};
