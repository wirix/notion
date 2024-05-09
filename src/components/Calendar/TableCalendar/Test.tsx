import { StatusTodoEnum, Todo, days, useTodoStore } from '../../../store';
import { Fragment, useCallback, useMemo, useRef, useState } from 'react';
import { ButtonIcon } from '../../ButtonIcon';
import { Box, TextField, Typography } from '@mui/material';
import { weekdays } from '../../Panels/PanelRoutine/TableRoutine';
import { Modal } from '../../Modal';
import { Button } from '../../Button';
import { useSelectElements } from '../hooks';
import { NextTasks } from '../NextTasks';
import dayjs from 'dayjs';
import { Days, Hours, SelectedCell, Table, Time } from '.';
import { SelectedEl } from './SelectedEl';

const monthNames = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];
const daysArray = Object.entries(days);
const DAYS_COUNT = daysArray.length;
const HOURS_COUNT = 24;

export const Test = () => {
  const {
    functions: { handleMouseDown, handleMouseUp, handleMouseMove, setIsClick },
    state: { elements, selectedColIndex },
  } = useSelectElements();
  const todos = useTodoStore((state) => state.todos);
  const addTodo = useTodoStore((state) => state.addTodo);

  const [weekOffset, setWeekOffset] = useState(0);

  const getDatesForWeek = useCallback((weekOffset: number) => {
    const currentDate = new Date();
    const currentDayOfWeek = currentDate.getDay() - 1;
    const weekdayTitles = Object.values(weekdays);

    const firstDayOfWeek = new Date(currentDate);
    firstDayOfWeek.setDate(currentDate.getDate() - currentDayOfWeek + 7 * weekOffset);

    const datesForWeek = Array.from({ length: DAYS_COUNT }, (_, index) => {
      const dayName = weekdayTitles[index];
      const day = new Date(firstDayOfWeek);
      day.setDate(firstDayOfWeek.getDate() + index);
      return {
        day: { index: day.getDate(), name: dayName },
        month: { index: day.getMonth(), name: monthNames[day.getMonth()] },
      };
    });

    return datesForWeek;
  }, []);
  const datesForWeek = useMemo(() => getDatesForWeek(0), []);

  return (
    <Typography
      sx={{ userSelect: 'none' }}
      height={'calc(100vh - 90px)'}
      component={'div'}
      display={'grid'}
      gridTemplateColumns={'280px 1fr 7fr'}
      gridTemplateRows={'70px 1fr'}
      gap={0}
      color={'whitegrey'}>
      <Box gridArea={'1 / 1 / 6 / 2'} pr={1}>
        Ближайшее задание
      </Box>
      <Days datesForWeek={datesForWeek} gridArea={'1 / 2 / 2 / 6'} display={'flex'} />
      <Box gridArea={'2 / 2 / 3 / 4'} display={'flex'} overflow={'auto'}>
        <Hours />
        {datesForWeek.map((date, indexCol) => (
          <Box height={80} flexGrow={1}>
            {new Array(HOURS_COUNT).fill(null).map((_, indexHour) => {
              const dateString = `2024-${datesForWeek[indexCol].month.index + 1}-${
                datesForWeek[indexCol].day.index
              }`;
              const nowTime = dayjs(dateString).set('hour', indexHour + 1);
              console.log('🚀 ~ {newArray ~ nowTime:', nowTime);
              return <SelectedEl todos={todos} nowTime={nowTime} height={80} width={141} />;
            })}
          </Box>
        ))}
      </Box>
    </Typography>
  );
};
