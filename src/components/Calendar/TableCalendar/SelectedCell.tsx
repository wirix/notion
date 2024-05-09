import { Box } from '@mui/material';
import dayjs from 'dayjs';
import { Fragment } from 'react';

const randomColors = [
  '#f44336',
  '#e91e63',
  '#9c27b0',
  '#673ab7',
  '#3f51b5',
  '#2196f3',
  '#03a9f4',
  '#00bcd4',
  '#8bc34a',
  '#cddc39',
  '#ffeb3b',
  '#ffc107',
  '#ff9800',
  '#ff5722',
];

const getRandomColor = () => randomColors[Math.floor(Math.random() * randomColors.length)];

export const SelectedCell = ({ datesForWeek, dayIndex, hour, todo, isSelected, ...props }) => {
  const dateString = `2024-${datesForWeek[dayIndex].month.index + 1}-${
    datesForWeek[dayIndex].day.index
  }`;
  const nowTime = dayjs(dateString).set('hour', hour);

  if (nowTime.isSame(todo.date[0])) {
    return (
      <Box color={'white'} bgcolor={getRandomColor}>
        {todo.text}
      </Box>
    );
  }

  if (
    (nowTime.isAfter(todo.date[0]) && nowTime.isBefore(todo.date[1])) ||
    nowTime.isSame(todo.date[0]) ||
    nowTime.isSame(todo.date[1])
  ) {
    return (
      <Box
        color={'white'}
        bgcolor={isSelected ? 'success.main' : 'primary.main'}
        sx={{ wordBreak: 'break-all' }}
        {...props}>
        {todo.text}
      </Box>
    );
  } else {
    return <Fragment>&nbsp;</Fragment>;
  }
};
