import { Box, styled } from '@mui/material';
import { Dayjs } from 'dayjs';
import { ComponentProps } from 'react';
import { Todo } from '../../../store';

interface SelectedElProps extends ComponentProps<typeof Box> {
  task?: Todo;
  status: CellWithTaskStatus;
  nowTime: Dayjs;
  isSelected: boolean;
  datesForWeek: { day: { index: number; name: string }; month: { index: number; name: string } }[];
}

export type CellWithTaskStatus = 'start' | 'end' | 'middle' | 'none';

export const Cell = ({
  task,
  isSelected,
  status,
  datesForWeek,
  nowTime,
  ...props
}: SelectedElProps) => {
  if (!task) {
    return (
      <Box
        bgcolor={isSelected ? 'blue' : 'primary.main'}
        color={'greywhite'}
        height={80}
        borderLeft={nowTime.day() === 1 ? 1 : 0}
        borderRight={1}
        borderTop={nowTime.format('HH') === '00' ? 1 : 0}
        borderBottom={1}
        sx={{
          cursor: 'row-resize',
        }}
        {...props}>
        &nbsp;
      </Box>
    );
  }

  switch (status) {
    case 'start':
      return (
        <Box
          color={'greywhite'}
          height={80}
          bgcolor={task.color}
          borderLeft={nowTime.day() === 1 ? 1 : 0}
          borderTop={nowTime.format('HH') === '00' ? 1 : 0}
          borderRight={1}
          sx={{
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            overflow: 'hidden',
            wordBreak: 'break-all',
          }}
          {...props}>
          {task.text}
        </Box>
      );
    case 'end':
      return (
        <Box
          bgcolor={task.color}
          color={'greywhite'}
          height={80}
          borderBottom={1}
          borderLeft={nowTime.day() === 1 ? 1 : 0}
          borderTop={nowTime.format('HH') === '00' ? 1 : 0}
          borderRight={1}
          sx={{
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
            overflow: 'hidden',
          }}
          {...props}></Box>
      );
    case 'middle':
      return (
        <Box
          bgcolor={task.color}
          color={'greywhite'}
          height={80}
          borderLeft={nowTime.day() === 1 ? 1 : 0}
          borderTop={nowTime.format('HH') === '00' ? 1 : 0}
          borderRight={1}
          key={task.id}
          {...props}></Box>
      );
    case 'none':
      return (
        <Box
          color={'greywhite'}
          height={80}
          borderLeft={nowTime.day() === 1 ? 1 : 0}
          borderRight={1}
          borderTop={nowTime.format('HH') === '00' ? 1 : 0}
          borderBottom={1}
          sx={{
            cursor: 'row-resize',
          }}
          {...props}>
          &nbsp; пусто
        </Box>
      );
  }
};
