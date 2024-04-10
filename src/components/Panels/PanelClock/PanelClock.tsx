import { Box } from '@mui/material';
import { useEffect, useState } from 'react';

export const PanelClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      bgcolor={'secondary.light'}
      borderRadius={'8px'}>
      <h2>{time.toLocaleTimeString()}</h2>
    </Box>
  );
};
