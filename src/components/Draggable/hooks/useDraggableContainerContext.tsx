import { useContext } from 'react';
import { DraggableContainerContext } from '../contexts';

export const useDraggableContainerContext = () => {
  const { ref } = useContext(DraggableContainerContext);
  if (!ref) {
    throw new Error('useRefContext must be used within a RefProvider');
  }
  return { ref };
};
