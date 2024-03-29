import { useCallback } from 'react';
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
    <TableRoutine
      tasks={tasks}
      toggleTask={handleToggleTask}
      addTask={handleAddTask}
      updateText={handleUpdateText}
    />
  );
};
