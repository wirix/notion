import { StatusTodoEnum, Todo, days, useTodoStore } from '../../../store';
import { useCallback, useMemo, useState } from 'react';
import { ButtonIcon } from '../../ButtonIcon';
import { Box, TextField, Typography } from '@mui/material';
import { weekdays } from '../../Panels/PanelRoutine/TableRoutine';
import { Modal } from '../../Modal';
import { Button } from '../../Button';
import { useSelectElements } from '../hooks';
import dayjs from 'dayjs';
import { Days, Hours } from '.';
import { Cell } from './Cell';

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

export const TableCalendar = () => {
  const {
    functions: { handleMouseDown, handleMouseUp, handleMouseMove },
    state: { elements, selectedColIndex, isClick },
  } = useSelectElements();
  const todos = useTodoStore((state) => state.todos);
  const addTodo = useTodoStore((state) => state.addTodo);

  const [weekOffset, setWeekOffset] = useState(0);
  const handleSetWeekOffset = (step: -1 | 1) => {
    setWeekOffset(weekOffset + step);
  };

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

  const [newTask, setNewTask] = useState<Todo>({
    id: crypto.randomUUID(),
    status: StatusTodoEnum.queue,
    date: [dayjs(), dayjs()],
    text: '',
  });
  console.log('🚀 ~ Test ~ newTask:', newTask);
  const [toggleModal, setToggleModal] = useState(false);

  const mouseUp = () => {
    handleMouseUp();
    if (elements.length) {
      setToggleModal(true);
    }
  };

  const onMouseMove = useCallback(
    (indexHour: number) => {
      if (!isClick) {
        return;
      }
      handleMouseMove(indexHour, selectedColIndex!);
      console.log('82373');
      const dateString = `2024-${datesForWeek[selectedColIndex!].month.index + 1}-${
        datesForWeek[selectedColIndex!].day.index
      }`;
      const minEl = elements.sort((a, b) => a - b)[0];
      const maxEl = elements.sort((a, b) => a - b)[elements.length - 1];

      setNewTask({
        ...newTask,
        date: [dayjs(dateString).set('hour', minEl), dayjs(dateString).set('hour', maxEl)],
      });
    },
    [elements],
  );

  const createNewTask = () => {
    console.log(newTask);
    addTodo(newTask);
    setToggleModal(false);
    setNewTask({
      id: crypto.randomUUID(),
      status: StatusTodoEnum.queue,
      date: [dayjs(), dayjs()],
      text: '',
    });
  };

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
      <Modal isOpen={toggleModal} onClose={() => setToggleModal(false)}>
        <TextField
          onChange={(e) => setNewTask({ ...newTask, text: e.target.value })}
          sx={{ mb: 2 }}
          label="Задача"
          variant="outlined"
        />
        <Button onClick={createNewTask}>Создать</Button>
      </Modal>
      <Box gridArea={'1 / 1 / 6 / 2'} pr={1}>
        Ближайшее задание
        <Box display={'flex'} my={2}>
          <ButtonIcon onClick={() => handleSetWeekOffset(-1)} icon="left" appearance="primary" />
          <ButtonIcon
            onClick={() => handleSetWeekOffset(1)}
            icon="right"
            appearance="primary"
            style={{ marginLeft: '16px' }}
          />
        </Box>
      </Box>
      <Days datesForWeek={datesForWeek} gridArea={'1 / 2 / 2 / 6'} display={'flex'} />
      <Box gridArea={'2 / 2 / 3 / 4'} display={'flex'} overflow={'auto'}>
        <Hours />
        {datesForWeek.map((_, indexCol) => (
          <Box height={80} flexGrow={1} key={indexCol}>
            {new Array(HOURS_COUNT).fill(null).map((_, indexHour) => {
              const dateString = `2024-${datesForWeek[indexCol].month.index + 1}-${
                datesForWeek[indexCol].day.index
              }`;
              const nowTime = dayjs(dateString).set('hour', indexHour);
              const findTask = todos.find(
                (todo) =>
                  nowTime.isSame(todo.date[0]) ||
                  nowTime.isSame(todo.date[1]) ||
                  (nowTime.isAfter(todo.date[0]) && nowTime.isBefore(todo.date[1])),
              );

              const status = nowTime.isSame(findTask?.date[0])
                ? 'start'
                : nowTime.isSame(findTask?.date[1])
                ? 'end'
                : findTask
                ? 'middle'
                : 'none';
              const isSelected = selectedColIndex === indexCol && elements.includes(indexHour);

              return (
                <Cell
                  key={`${indexHour} + ${indexCol}`}
                  datesForWeek={datesForWeek}
                  task={findTask}
                  status={status}
                  isSelected={isSelected}
                  nowTime={nowTime}
                  height={80}
                  width={141}
                  onMouseDown={() => handleMouseDown(indexHour, indexCol)}
                  onMouseMove={() => onMouseMove(indexHour)}
                  onMouseUp={() => mouseUp()}
                />
              );
            })}
          </Box>
        ))}
      </Box>
    </Typography>
  );
};
