import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Checkbox, Typography } from '@mui/material';
import { Task, Day, useRoutineStore } from '../../../store/routine-store';
import AddIcon from '@mui/icons-material/Add';
import { ButtonIcon, EditableText } from '../..';
import { StylesTableCell } from '.';
import { useState } from 'react';

interface TableRoutineProps {
  tasks: Task[];
  addTask: () => void;
  updateText: (id: string, text: string) => void;
  toggleTask: (id: string, day: Day) => void;
}

export const weekdays: Record<Day, string> = {
  monday: 'Пн',
  tuesday: 'Вт',
  wednesday: 'Ср',
  thursday: 'Чт',
  friday: 'Пт',
  saturday: 'Сб',
  sunday: 'Вс',
};

export const TableRoutine = ({ tasks, toggleTask, addTask, updateText }: TableRoutineProps) => {
  const [choiceIds, setChoiceIds] = useState<string[]>([]);
  const { deleteTask } = useRoutineStore();

  const handleDeleteTodo = () => {
    choiceIds.forEach((id) => {
      console.log(id);
      deleteTask(id);
    });
    setChoiceIds([]);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography component={'div'} color="#151111" fontSize={18} fontWeight={500} mr={1}>
                Рутина
              </Typography>
              <ButtonIcon
                disabled={choiceIds.length === 0}
                icon={'trash'}
                appearance={'danger'}
                onClick={handleDeleteTodo}></ButtonIcon>
            </TableCell>
            {Object.values(weekdays).map((day) => (
              <StylesTableCell width={'40px'} padding={'none'} key={day} align="center">
                {day}
              </StylesTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <StylesTableCell
                component="th"
                scope="row"
                sx={{ display: 'flex', alignItems: 'center' }}>
                <Checkbox
                  checked={choiceIds.includes(task.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setChoiceIds([...choiceIds, task.id]);
                    } else {
                      setChoiceIds(choiceIds.filter((id) => id !== task.id));
                    }
                  }}
                />
                <EditableText id={task.id} updateText={updateText}>
                  {task.text}
                </EditableText>
              </StylesTableCell>
              {Object.keys(weekdays).map((day) => (
                <StylesTableCell padding={'none'} key={`${task}-${day}`} align="center">
                  <Checkbox
                    checked={task.completed[day]}
                    onClick={() => toggleTask(task.id, day as Day)}
                  />
                </StylesTableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button
        onClick={addTask}
        sx={{
          p: 1,
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          bgcolor: '#fff',
          ':hover': { bgcolor: '#fff' },
        }}>
        <AddIcon />
        Новая
      </Button>
    </TableContainer>
  );
};
