import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Checkbox } from '@mui/material';
import { Task, Day } from '../../../store/routine-store';
import AddIcon from '@mui/icons-material/Add';
import { EditableText } from '../..';
import { StylesTableCell } from '.';

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
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Рутина</TableCell>
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
              <StylesTableCell component="th" scope="row">
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
