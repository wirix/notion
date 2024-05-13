import { Box, Typography } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { ComponentProps, HTMLAttributes, forwardRef } from 'react';
import { Todo } from '../../../store';
import { truncateString } from '../../../utils';

interface SelectedElProps extends ComponentProps<typeof Box> {
  task?: Todo;
  status: CellWithTaskStatus;
  nowTime: Dayjs;
  isSelected: boolean;
  datesForWeek: { day: { index: number; name: string }; month: { index: number; name: string } }[];
}

export type CellWithTaskStatus = 'start' | 'end' | 'middle' | 'none';

const Modal1 = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(({ ...props }, ref) => {
  return (
    <Box
      color={'white'}
      width={200}
      height={200}
      position={'absolute'}
      right={0}
      top={0}
      {...props}>
      MODAL11111111111111111111111111111
    </Box>
  );
});

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
        p={1}
        bgcolor={isSelected ? 'lime' : 'grey'}
        borderColor={'greywhite'}
        color={'black'}
        borderLeft={nowTime.day() === 1 ? 1 : 0}
        borderRight={1}
        borderTop={nowTime.format('HH') === '00' ? 1 : 0}
        borderBottom={1}
        {...props}>
        &nbsp;
      </Box>
    );
  }

  switch (status) {
    case 'start':
      return (
        <Box
          p={1}
          color={'black'}
          borderColor={'greywhite'}
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
          <Typography component={'div'} color={'black'} fontSize={20} fontWeight={500}>
            {truncateString(task.text, 20)}
          </Typography>
          <Typography component={'span'} color={'black'} fontSize={16} fontWeight={400}>
            {dayjs(task.date[0]).hour().toLocaleString('ru-RU', { minimumIntegerDigits: 2 })}:
            {dayjs(task.date[0]).minute().toLocaleString('ru-RU', { minimumIntegerDigits: 2 })}
          </Typography>{' '}
          -{' '}
          <Typography component={'span'} color={'black'} fontSize={16} fontWeight={400}>
            {dayjs(task.date[1]).hour().toLocaleString('ru-RU', { minimumIntegerDigits: 2 })}:
            {dayjs(task.date[1]).minute().toLocaleString('ru-RU', { minimumIntegerDigits: 2 })}
          </Typography>
        </Box>
      );
    case 'end':
      return (
        <Box
          p={1}
          bgcolor={task.color}
          borderColor={'greywhite'}
          color={'black'}
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
          p={1}
          bgcolor={task.color}
          color={'black'}
          borderColor={'greywhite'}
          borderLeft={nowTime.day() === 1 ? 1 : 0}
          borderTop={nowTime.format('HH') === '00' ? 1 : 0}
          borderRight={1}
          key={task.id}
          {...props}></Box>
      );
    case 'none':
      return (
        <Box
          p={1}
          borderColor={'greywhite'}
          color={'black'}
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
