import { Box, Typography } from '@mui/material';
import dayjs from 'dayjs';

export const Days = ({ datesForWeek, ...props }) => {
  const nowTime = dayjs().date();
  return (
    <Box {...props}>
      <Box width={141}></Box>
      {datesForWeek.map((date) => (
        <Box
          width={141}
          textTransform={'capitalize'}
          key={date.day.index}
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'space-between'}
          height={'100%'}
          sx={{ userSelect: 'none' }}>
          <Typography component={'div'} color={nowTime === date.day.index ? 'aqua' : 'inherit'}>
            {date.day.name}
          </Typography>
          <Typography
            component={'div'}
            fontSize={32}
            color={nowTime === date.day.index ? 'aqua' : 'inherit'}>
            {date.day.index}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};
