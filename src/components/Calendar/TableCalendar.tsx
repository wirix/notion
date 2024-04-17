import { days } from '../../store';
import { useState } from 'react';
import { ButtonIcon } from '../ButtonIcon';
import { Box } from '@mui/material';

export const CalendarTable = () => {
  const daysArray = Object.entries(days);
  const DAYS_COUNT = daysArray.length;
  const HOURS_COUNT = 24;
  const hoursArray = Array.from({ length: 24 }, (_, index) => {
    const hours = index % 12 || 12;
    const ampm = index < 12 ? 'am' : 'pm';
    const timeString = `${hours}:00 ${ampm}`;
    const mls = index * 60 * 60 * 1000;

    return { name: timeString, mls };
  });

  const [weekOffset, setWeekOffset] = useState(0);

  const handleSetWeekOffset = (step: -1 | 1) => {
    setWeekOffset(weekOffset + step);
  };

  return (
    <Box display={'flex'}>
      <Box width={'400px'}></Box>

      <Box height={'calc(100vh - 90px)'} display={'flex'} flexDirection={'column'} flexGrow={1}>
        <Box display={'flex'}>
          <ButtonIcon onClick={() => handleSetWeekOffset(-1)} icon="trash" appearance="danger" />
          <ButtonIcon onClick={() => handleSetWeekOffset(1)} icon="trash" appearance="danger" />
        </Box>
        <Box display={'grid'} gridTemplateColumns={`repeat(${DAYS_COUNT + 1}, 1fr)`} flexGrow={1}>
          <Box>Час</Box>
          {daysArray.map(([key, day]) => (
            <Box
              key={key}
              display={'flex'}
              flexDirection={'column'}
              justifyContent={'space-between'}
              height={'100%'}>
              {day}
            </Box>
          ))}
        </Box>
        <Box
          display={'grid'}
          overflow={'auto'}
          gridTemplateColumns={`repeat(${DAYS_COUNT + 1}, 1fr)`}
          flexGrow={1}>
          <Box display={'flex'} flexDirection={'column'}>
            {hoursArray.map((hour, index) => (
              <Box
                key={index}
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'space-between'}
                borderBottom={2}
                py={2}>
                {hour.name}
              </Box>
            ))}
          </Box>
          {daysArray.map(() => (
            <Box
              display={'flex'}
              flexDirection={'column'}
              justifyContent={'space-between'}
              height={'100%'}>
              <Box display={'flex'} flexDirection={'column'}>
                {new Array(HOURS_COUNT).fill(null).map((_, index) => (
                  <Box key={index} borderBottom={2} py={2}>
                    {index}
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
