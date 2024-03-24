import { DraggableCard } from '../..';
import { PanelsEnum } from '../../../store/panels-store';

export const PanelRoutine = () => {
  return (
    <DraggableCard
      style={{ display: 'flex', position: 'relative', backgroundColor: '#fff' }}
      panel={PanelsEnum.ROUTINE}>
      <div>я я я я я я я я я я яя я я я я я</div>
    </DraggableCard>
  );
};
