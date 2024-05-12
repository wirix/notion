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
    <Box borderTop={1} {...props}>
      {hours.map((hour) => (
        <Box
          key={hour.mls}
          width={141}
          height={100}
          display={'flex'}
          justifyContent={'right'}
          pr={2}
          borderBottom={1}
          fontSize={20}
          textTransform={'uppercase'}>
          {hour.name}
        </Box>
      ))}
    </Box>
  );
};
