import { Box } from '@mui/material';

export const Hours = ({ ...props }) => {
  const hours = Array.from({ length: 24 }, (_, index) => {
    const hours = index % 12 || 12;
    const ampm = index < 12 ? 'am' : 'pm';
    const timeString = `${hours}:00 ${ampm}`;
    const mls = index * 60 * 60 * 1000;

    return { name: timeString, mls };
  });

  return (
    <Box {...props}>
      {hours.map((hour) => (
        <Box
          key={hour.mls}
          width={141}
          height={80}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}>
          {hour.name}
        </Box>
      ))}
    </Box>
  );
};
