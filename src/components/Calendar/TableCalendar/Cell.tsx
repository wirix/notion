import { Box, Typography, lighten, darken } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { ComponentProps } from 'react';
import { Todo } from '../../../store';
import { truncateString } from '../../../utils';

interface SelectedElProps extends ComponentProps<typeof Box> {
  task?: Todo;
  status: CellWithTaskStatus;
  nowTime: Dayjs;
  isSelected: boolean;
  datesForWeek: { day: { index: number; name: string }; month: { index: number; name: string } }[];
  idModal: string | undefined;
  handleToggleModal: (idTask: string) => void;
}

export type CellWithTaskStatus = 'start' | 'end' | 'middle' | 'none';

export const Cell = ({
  task,
  isSelected,
  status,
  datesForWeek,
  nowTime,
  idModal,
  handleToggleModal,
  ...props
}: SelectedElProps) => {
  if (!task) {
    return (
      <Box
        sx={{ '&:hover': { bgcolor: 'indigo' }, cursor: 'pointer' }}
        bgcolor={isSelected ? 'indigo' : 'darkslateblue'}
        borderBottom={1}
        {...props}>
        &nbsp;
      </Box>
    );
  }

  switch (status) {
    case 'start':
      return (
        <Box borderLeft={4} borderColor={lighten(task.color!, 0.3)} {...props}>
          <Box
            bgcolor={task.color}
            width={'95%'}
            height={'100%'}
            pl={1}
            sx={{
              borderTopRightRadius: 8,
              overflow: 'hidden',
              wordBreak: 'break-all',
              cursor: 'pointer',
            }}
            onClick={() => handleToggleModal(task.id)}>
            <Typography component={'div'} color="black" fontSize={18} fontWeight={500}>
              {truncateString(task.text, 28)}
            </Typography>
            <Typography component={'span'} color="black" fontSize={14} fontWeight={400}>
              {dayjs(task.date[0]).hour().toLocaleString('ru-RU', { minimumIntegerDigits: 2 })}:
              {dayjs(task.date[0]).minute().toLocaleString('ru-RU', { minimumIntegerDigits: 2 })}
            </Typography>{' '}
            -{' '}
            <Typography component={'span'} color="black" fontSize={14} fontWeight={400}>
              {dayjs(task.date[1]).hour().toLocaleString('ru-RU', { minimumIntegerDigits: 2 })}:
              {dayjs(task.date[1]).minute().toLocaleString('ru-RU', { minimumIntegerDigits: 2 })}
            </Typography>
          </Box>
        </Box>
      );
    case 'end':
      return (
        <Box borderLeft={4} borderColor={lighten(task.color!, 0.25)} borderBottom={1} {...props}>
          <Box
            bgcolor={task.color}
            width={'95%'}
            height={'100%'}
            onClick={() => handleToggleModal(task.id)}
            sx={{
              borderBottomRightRadius: 8,
              overflow: 'hidden',
              position: 'relative',
              cursor: 'pointer',
              ':before': {
                display: 'block',
                content: '""',
                position: 'absolute',
                right: '10px',
                bottom: '7px',
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: `${darken(task.color!, 0.25)}`,
              },
            }}></Box>
        </Box>
      );
    case 'middle':
      return (
        <Box
          borderLeft={4}
          borderColor={lighten(task.color!, 0.25)}
          sx={{ cursor: 'pointer' }}
          onClick={() => handleToggleModal(task.id)}
          {...props}>
          <Box bgcolor={task.color} width={'95%'} height={'100%'}></Box>
        </Box>
      );
    case 'none':
      return (
        <Box
          onClick={() => handleToggleModal(task.id)}
          p={1}
          borderColor={'greywhite'}
          borderBottom={1}
          sx={{
            cursor: 'pointer',
          }}
          {...props}>
          &nbsp; пусто
        </Box>
      );
  }
};
