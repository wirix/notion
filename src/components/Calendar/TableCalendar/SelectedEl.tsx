import { Box } from '@mui/material';
import { Todo } from '../../../store';
import { Dayjs } from 'dayjs';
import { ComponentProps } from 'react';

interface SelectedElProps extends ComponentProps<typeof Box> {
  todos: Todo[];
  nowTime: Dayjs;
}

export const SelectedEl = ({ todos, nowTime, ...props }: SelectedElProps) => {
  return (
    <>
      {todos.map((todo) => {
        if (nowTime.isSame(todo.date[0])) {
          console.log('0');
          return (
            <Box
              height={80}
              borderRadius={4}
              borderTop={1}
              borderLeft={1}
              borderRight={1}
              key={todo.id}
              {...props}>
              1
            </Box>
          );
        }
        if (nowTime.isSame(todo.date[1])) {
          console.log('1');
          return (
            <Box
              height={80}
              borderRadius={4}
              borderBottom={1}
              borderLeft={1}
              borderRight={1}
              key={todo.id}
              {...props}>
              1
            </Box>
          );
        }
        if (nowTime.isAfter(todo.date[0]) && nowTime.isBefore(todo.date[1])) {
          console.log('01');
          return (
            <Box height={80} borderLeft={1} borderRight={1} key={todo.id} {...props}>
              1
            </Box>
          );
        }
        console.log(nowTime.format('HH'));
        return (
          <Box
            key={todo.id}
            height={80}
            borderLeft={1}
            borderRight={1}
            borderTop={nowTime.format('HH') === '01' ? 1 : 0}
            borderBottom={1}>
            &nbsp;
          </Box>
        );
      })}
    </>
  );
};
