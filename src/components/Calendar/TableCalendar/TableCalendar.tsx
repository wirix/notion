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
import { SelectedCell } from '.';

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
const hoursArray = Array.from({ length: 24 }, (_, index) => {
  const hours = index % 12 || 12;
  const ampm = index < 12 ? 'am' : 'pm';
  const timeString = `${hours}:00 ${ampm}`;
  const mls = index * 60 * 60 * 1000;

  return { name: timeString, mls };
});

export const TableCalendar = () => {
  const {
    functions: { handleMouseDown, handleMouseUp, handleMouseMove, setIsClick },
    state: { elements, selectedColIndex },
  } = useSelectElements();
  const todos = useTodoStore((state) => state.todos);
  const addTodo = useTodoStore((state) => state.addTodo);

  const [weekOffset, setWeekOffset] = useState(0);
  const [toggleModal, setToggleModal] = useState(false);
  const [newTodo, setNewTodo] = useState<Todo>({
    id: crypto.randomUUID(),
    status: StatusTodoEnum.queue,
    date: [dayjs(), dayjs()],
    text: '',
  });
  console.log('🚀 ~ TableCalendar ~ newTodo:', newTodo);

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
  const datesForWeek = useMemo(() => getDatesForWeek(weekOffset), [weekOffset]);

  const handleSetWeekOffset = (step: -1 | 1) => {
    setWeekOffset(weekOffset + step);
  };

  const handleMoveSelectedRows = (indexHour: number, indexDay: number) => {
    handleMouseMove(indexHour, indexDay);

    const dateString = `2024-${datesForWeek[indexDay].month.index + 1}-${
      datesForWeek[indexDay].day.index
    }`;
    const minEl = elements.sort((a, b) => a - b)[0];
    const maxEl = elements.sort((a, b) => a - b)[elements.length - 1];

    setNewTodo({
      ...newTodo,
      date: [dayjs(dateString).set('hour', minEl), dayjs(dateString).set('hour', maxEl)],
    });
  };

  const openModal = () => {
    setIsClick(false);
    if (elements.length) {
      setToggleModal(true);
    }
  };

  const createTask = () => {
    addTodo(newTodo);
    setToggleModal(false);
    handleMouseUp();
  };

  const cancelTask = useCallback(() => {
    setToggleModal(false);
    handleMouseUp();
  }, []);

  return (
    <Typography component={'div'} display={'flex'} color={'black'}>
      <Modal isOpen={toggleModal} onClose={cancelTask}>
        <TextField
          onChange={(e) => setNewTodo({ ...newTodo, text: e.target.value })}
          sx={{ mb: 2 }}
          label="Задача"
          variant="outlined"
        />
        <Button onClick={createTask}>Создать</Button>
      </Modal>

      <NextTasks width={'300px'} mr={1} />

      <Box
        height={'calc(100vh - 90px)'}
        display={'flex'}
        flexDirection={'column'}
        flexGrow={1}
        onMouseLeave={() => openModal()}>
        <Box display={'flex'} my={2}>
          <ButtonIcon onClick={() => handleSetWeekOffset(-1)} icon="left" appearance="primary" />
          <ButtonIcon
            onClick={() => handleSetWeekOffset(1)}
            icon="right"
            appearance="primary"
            style={{ marginLeft: '16px' }}
          />
        </Box>
        <Box display={'grid'} gridTemplateColumns={`repeat(${DAYS_COUNT + 1}, 1fr)`} flexGrow={1}>
          <Box width={138}></Box>
          {datesForWeek.map((date, index) => (
            <Box
              width={138}
              textTransform={'capitalize'}
              key={index}
              display={'flex'}
              flexDirection={'column'}
              justifyContent={'space-between'}
              height={'100%'}
              sx={{ userSelect: 'none' }}>
              <Typography component={'div'}>{date.day.name}</Typography>
              <Typography component={'div'} fontSize={32}>
                {date.day.index}
              </Typography>
            </Box>
          ))}
        </Box>
        <Box
          display={'grid'}
          overflow={'auto'}
          gridTemplateColumns={`repeat(${DAYS_COUNT + 1}, 1fr)`}
          flexGrow={1}>
          <Box display={'flex'} flexDirection={'column'}>
            {hoursArray.map((hour, index) => (
              <Typography
                key={index}
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'space-between'}
                textTransform={'uppercase'}
                py={4}
                sx={{ userSelect: 'none' }}>
                {hour.name}
              </Typography>
            ))}
          </Box>
          {daysArray.map((_, indexDay) => (
            <Box
              display={'flex'}
              key={indexDay}
              flexDirection={'column'}
              justifyContent={'space-between'}
              height={'100%'}>
              <Box
                display={'flex'}
                flexDirection={'column'}
                borderLeft={1}
                sx={{
                  cursor: 'row-resize',
                  borderColor: 'secondary.main',
                }}>
                {new Array(HOURS_COUNT).fill(null).map((_, indexHour) => {
                  const isSelected = selectedColIndex === indexDay && elements.includes(indexHour);
                  return (
                    <div
                      key={indexHour}
                      onMouseMove={() => handleMoveSelectedRows(indexHour, indexDay)}
                      onMouseDown={() => handleMouseDown(indexHour, indexDay)}
                      onMouseUp={() => openModal()}>
                      <Box
                        bgcolor={isSelected ? 'success.main' : 'primary.main'}
                        borderTop={1}
                        sx={{
                          userSelect: 'none',
                          opacity: 0.75,
                        }}
                        borderLeft={isSelected ? 4 : 0}
                        borderColor={isSelected ? '#21ca2f' : 'secondary.main'}
                        py={4}>
                        {todos.map((todo, index) => (
                          <SelectedCell
                            key={index}
                            todo={todo}
                            dayIndex={indexDay}
                            hour={indexHour}
                            isSelected={isSelected}
                            datesForWeek={datesForWeek}
                          />
                        ))}
                      </Box>
                    </div>
                  );
                })}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Typography>
  );
};
