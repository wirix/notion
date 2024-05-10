import dayjs, { Dayjs } from 'dayjs';
import { DateRange } from '@mui/x-date-pickers-pro/models';
import { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { StylesDatePicker } from '.';

export const PickerCalendar = ({
  date,
  id,
  updateStore,
  ...props
}: {
  date: DateRange<Dayjs>;
  id: string;
  updateStore: (id: string, date: DateRange<Dayjs>) => void;
}) => {
  const [value, setValue] = useState<DateRange<Dayjs>>([dayjs(date[0]), dayjs(date[1])]);

  const onChangeDate = (newValue: DateRange<Dayjs>) => {
    setValue(newValue);
    updateStore(id, newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StylesDatePicker
        format="DD.MM.YYYY"
        disabled
        value={value}
        onChange={onChangeDate}
        calendars={1}
        formatDensity={undefined}
        enableAccessibleFieldDOMStructure={undefined}
        selectedSections={undefined}
        onSelectedSectionsChange={undefined}
        {...props}
      />
    </LocalizationProvider>
  );
};
