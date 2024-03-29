import { useCallback } from 'react';
import { DraggableCard } from '../..';
import { PanelsEnum } from '../../../store/panels-store';
import { TableRoutine } from './TableRoutine';
import { useRoutineStore, Day } from '../../../store';

export const PanelRoutine = () => {
  const { tasks, toggleTask, addTask, updateText } = useRoutineStore();

  const handleAddTask = useCallback(() => {
    addTask();
  }, []);

  const handleUpdateText = useCallback((id: string, text: string) => {
    updateText(id, text);
  }, []);

  const handleToggleTask = useCallback((id: string, day: Day) => {
    toggleTask(id, day);
  }, []);

  return (
    <DraggableCard
      style={{ display: 'flex', position: 'relative', backgroundColor: '#fff' }}
      panel={PanelsEnum.ROUTINE}>
      <TableRoutine
        tasks={tasks}
        toggleTask={handleToggleTask}
        addTask={handleAddTask}
        updateText={handleUpdateText}
      />
    </DraggableCard>
  );
};
