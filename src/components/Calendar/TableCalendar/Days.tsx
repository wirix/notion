import { Box, Typography } from '@mui/material';

export const Days = ({ datesForWeek, ...props }) => {
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
          <Typography component={'div'}>{date.day.name}</Typography>
          <Typography component={'div'} fontSize={32}>
            {date.day.index}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};
