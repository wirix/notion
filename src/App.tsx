import { createContext, useCallback, useContext, useState } from 'react';
import { Panels, Layout } from './components';
import { Calendar } from './components/Calendar';
import { DraggableContainerProvider } from './components/Draggable/contexts';
import { Box, ThemeProvider, useTheme } from '@mui/material';

const ColorModeContext = createContext({ toggleColorMode: () => {} });

export const App = () => {
  const [isOpenCalendar, setIsOpenCalendar] = useState(true);

  const toogleCalendar = useCallback(() => {
    setIsOpenCalendar((prev) => !prev);
    colorMode.toggleColorMode();
  }, []);

  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          transition: 'background-color 0.5s ease',
          backgroundColor: isOpenCalendar ? '#151111' : 'primary.light',
        }}>
        <Layout toogleCalendar={toogleCalendar} position={'relative'} height={'100vh'}>
          <DraggableContainerProvider>
            <Panels />
          </DraggableContainerProvider>
          <Calendar isOpenCalendar={isOpenCalendar} />
        </Layout>
      </Box>
    </ThemeProvider>
  );
};
