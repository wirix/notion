import { useCallback, useState } from 'react';
import { Panels, Layout } from './components';
import { Calendar } from './components/Calendar';
import { DraggableContainerProvider } from './components/Draggable/contexts';

export const App = () => {
  const [isOpenCalendar, setIsOpenCalendar] = useState(true);

  const toogleCalendar = useCallback(() => {
    setIsOpenCalendar((prev) => !prev);
  }, []);

  return (
    <Layout toogleCalendar={toogleCalendar} position={'relative'}>
      <DraggableContainerProvider>
        <Panels />
      </DraggableContainerProvider>
      <Calendar isOpenCalendar={isOpenCalendar} />
    </Layout>
  );
};
