import { Panels, Layout } from './components';
import { DraggableContainerProvider } from './components/Draggable/contexts';

export const App = () => {
  return (
    <Layout>
      <DraggableContainerProvider>
        <Panels />
      </DraggableContainerProvider>
    </Layout>
  );
};
