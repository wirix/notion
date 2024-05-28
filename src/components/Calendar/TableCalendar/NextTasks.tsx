import { Box, Typography } from '@mui/material';
import { Todo } from '../../../store';
import dayjs from 'dayjs';
import { ButtonIcon } from '../..';
import { ComponentProps } from 'react';

interface NextTasksProps extends ComponentProps<typeof Typography<'div'>> {
  todos: Todo[];
  datesForWeek: { day: { index: number; name: string }; month: { index: number; name: string } }[];
  handleSetWeekOffset: (step: -1 | 1) => void;
}

export const NextTasks = ({
  todos,
  datesForWeek,
  handleSetWeekOffset,
  ...props
}: NextTasksProps) => {
  const minTime = dayjs(`2024-${datesForWeek[0].month.index + 1}-${datesForWeek[0].day.index}`);
  const maxTime = dayjs(`2024-${datesForWeek[6].month.index + 1}-${datesForWeek[6].day.index}`);
  const tasks = todos
    .filter(
      (todo) =>
        (dayjs(todo.date[0]).isAfter(minTime) && dayjs(todo.date[1]).isBefore(maxTime)) ||
        dayjs(todo.date[0]).isSame(minTime) ||
        dayjs(todo.date[1]).isSame(maxTime),
    )
    .sort((a, b) => dayjs(a.date[0]).diff(dayjs(b.date[0])));

  const proccessedTasks = tasks.map((todo) => {
    if (dayjs(todo.date[0]).isBefore(dayjs()) && dayjs(todo.date[1]).isAfter(dayjs())) {
      return (
        <Box color="grey" key={todo.id} fontSize={16}>
          {todo.text}
        </Box>
      );
    }
  });

  return (
    <Typography variant="h5" fontWeight={500} {...props}>
      Задачи на {minTime.format('DD.MM.YYYY')} - {maxTime.format('DD.MM.YYYY')}
      <Box display={'flex'} my={2}>
        <ButtonIcon onClick={() => handleSetWeekOffset(-1)} icon="left" appearance="primary" />
        <ButtonIcon
          onClick={() => handleSetWeekOffset(1)}
          icon="right"
          appearance="primary"
          style={{ marginLeft: '16px' }}
        />
      </Box>
      <Box
        mt={2}
        sx={{ wordBreak: 'break-word' }}
        border={'1px solid grey'}
        p={2}
        textTransform={'capitalize'}
        borderRadius={'8px'}>
        {proccessedTasks.length !== 0 && (
          <Box mb={2}>
            <Typography color="firebrick" fontWeight={600} component={'h2'} fontSize={26}>
              В процессе
            </Typography>
            {proccessedTasks}
          </Box>
        )}
        <Box mb={2}>
          <Typography component={'h2'} fontSize={26}>
            Сегодня
          </Typography>
          {tasks.map((todo) => {
            if (dayjs(todo.date[0]).isSame(dayjs(), 'day')) {
              return (
                <Box color="grey" key={todo.id} fontSize={16}>
                  {todo.text}
                </Box>
              );
            }
          })}
        </Box>
        <Box>
          <Typography component={'h2'} fontSize={26}>
            Невыполненные
          </Typography>

          {tasks.map((todo) => {
            if (dayjs(todo.date[0]).isBefore(dayjs(), 'day')) {
              return (
                <Box color="grey" key={todo.id} fontSize={16}>
                  {todo.text}
                </Box>
              );
            }
          })}
        </Box>
      </Box>
    </Typography>
  );
};
