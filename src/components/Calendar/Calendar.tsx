import { Box, BoxProps } from '@mui/material';
import { Test } from './TableCalendar/Test';

interface CalendarProps extends BoxProps {
  isOpenCalendar: boolean;
}

export const Calendar = ({ isOpenCalendar, ...props }: CalendarProps) => {
  return (
    <Box
      position={'absolute'}
      left={0}
      zIndex={1000}
      top={isOpenCalendar ? 0 : '-100vh'}
      width={'100%'}
      pt={'90px'}
      bgcolor={'primary.main'}
      color={'white'}
      sx={{
        borderBottomLeftRadius: '8px',
        borderBottomRightRadius: '8px',
        transition: 'top 0.5s ease',
      }}
      {...props}>
      <Test />
    </Box>
  );
};
