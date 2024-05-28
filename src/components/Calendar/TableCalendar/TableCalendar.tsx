import { Todo, days, useTodoStore } from '../../../store';
import { ReactNode, useCallback, useMemo, useState } from 'react';
import { Box, TextField, Typography, lighten } from '@mui/material';
import { weekdays } from '../../Panels/PanelRoutine/TableRoutine';
import { Modal } from '../../Modal';
import { Button } from '../../Button';
import { useSelectElements } from '../hooks';
import dayjs, { Dayjs } from 'dayjs';
import { Days, Hours, NextTasks } from '.';
import { Cell } from './Cell';
import { useModalPosition } from '../../../hooks/useModalPosition';
import CloseIcon from '@mui/icons-material/Close';
import { EditableText } from '../..';
import { DateRange } from '@mui/x-date-pickers-pro';

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

const PORTAL_WIDTH = 300;
const PORTAL_HEIGHT = 200;
const PortalCell = ({
  children,
  isOpen,
  x,
  y,
  bgColor,
  handleToggleModal,
  ...props
}: {
  children: ReactNode;
  isOpen: boolean;
  bgColor: string;
  x: number;
  y: number;
  handleToggleModal: (str: string) => void;
}) => {
  if (!isOpen) {
    return;
  }

  const styled = {
    position: 'absolute',
    top: y,
    left: x,
    zIndex: 1000,
    width: PORTAL_WIDTH,
    height: PORTAL_HEIGHT,
    borderRadius: 2,
    bgcolor: lighten(bgColor, 0.2),
    border: '3px solid white',
    boxShadow: 24,
    wordBreak: 'break-word',
    p: 1,
  };

  return (
    <Modal isOpen={isOpen} styled={styled}>
      <Box display={'flex'} justifyContent={'space-between'} {...props}>
        <Box>{children}</Box>
        <Box
          height={'100%'}
          display={'flex'}
          alignItems={'center'}
          sx={{ cursor: 'pointer' }}
          onClick={() => handleToggleModal('')}>
          <CloseIcon fontSize={'large'} />
        </Box>
      </Box>
    </Modal>
  );
};

const statusTranslate = (date?: DateRange<Dayjs>) => {
  if (!date) return 'В очереди';

  const now = dayjs();
  const start = dayjs(date[0]);
  const end = dayjs(date[1]);

  if (start.isBefore(now) && end.isAfter(now)) {
    return 'В процессе';
  }
  if (end.isBefore(now)) {
    return 'Не выполненные';
  }
  if (start.isAfter(now) || start.isSame(now, 'day')) {
    return 'В очереди';
  }

  return 'В очереди';
};

export const TableCalendar = () => {
  const {
    functions: { handleMouseDown, handleMouseUp, handleMouseMove },
    state: { elements, selectedColIndex, isClick },
  } = useSelectElements();
  const { addTodo, updateTodo, todos } = useTodoStore((state) => state);

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
    date: [dayjs(), dayjs()],
    text: '',
    note: '',
  });
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
      handleMouseMove(indexHour);
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
    addTodo(newTask);
    setToggleModal(false);
    setNewTask({
      id: crypto.randomUUID(),
      date: [dayjs(), dayjs()],
      text: '',
      note: '',
    });
  };

  const { ref, position } = useModalPosition(PORTAL_WIDTH, PORTAL_HEIGHT);
  const [idModal, setIdModal] = useState<string | null>(null);

  const handleToggleModal = (idTask: string) => {
    if (idModal) {
      setIdModal(null);
      return;
    }
    setIdModal(idTask);
  };

  const updateTaskText = useCallback((id: string, text: string) => {
    updateTodo(id, { text });
  }, []);

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
        <TextField
          onChange={(e) => setNewTask({ ...newTask, note: e.target.value })}
          sx={{ mb: 2 }}
          label="Примечание"
          variant="outlined"
        />
        <Button onClick={createNewTask}>Создать</Button>
      </Modal>
      <NextTasks
        component="div"
        gridArea={'2 / 1 / 6 / 2'}
        pr={1}
        todos={todos}
        handleSetWeekOffset={handleSetWeekOffset}
        datesForWeek={datesForWeek}
      />
      <Days datesForWeek={datesForWeek} gridArea={'1 / 2 / 2 / 6'} display={'flex'} />
      <Box gridArea={'2 / 2 / 3 / 4'} display={'flex'} overflow={'auto'}>
        <Hours />
        {datesForWeek.map((_, indexCol) => (
          <Box height={100} flexGrow={1} key={indexCol}>
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
                <Box key={`${indexHour} + ${indexCol}`} position={'relative'}>
                  <Cell
                    height={100}
                    width={141}
                    color="black"
                    textTransform={'capitalize'}
                    borderRight={1}
                    datesForWeek={datesForWeek}
                    task={findTask}
                    status={status}
                    isSelected={isSelected}
                    nowTime={nowTime}
                    handleToggleModal={handleToggleModal}
                    idModal={findTask?.id}
                    onMouseDown={() => status === 'none' && handleMouseDown(indexHour, indexCol)}
                    onMouseMove={() => status === 'none' && onMouseMove(indexHour)}
                    onMouseUp={() => status === 'none' && mouseUp()}
                    ref={ref}
                  />
                  <PortalCell
                    bgColor={findTask?.color ?? 'white'}
                    x={position.x}
                    y={position.y}
                    isOpen={idModal === findTask?.id && status === 'start'}
                    handleToggleModal={handleToggleModal}>
                    <Typography color={'black'} component={'div'}>
                      <EditableText
                        id={findTask?.id ?? ''}
                        updateText={updateTaskText}
                        color={'black'}
                        component={'div'}
                        fontSize={24}
                        fontWeight={600}
                        sx={{ cursor: 'pointer' }}
                        textTransform={'capitalize'}
                        mb={1}>
                        {findTask?.text ?? ''}
                      </EditableText>
                    </Typography>
                    <Typography
                      border={'1px solid cyan'}
                      borderRadius={4}
                      mb={1}
                      textAlign={'center'}
                      width={'100%'}
                      overflow={'hidden'}
                      color={'black'}
                      component={'div'}
                      fontSize={16}
                      fontWeight={500}
                      textTransform={'capitalize'}>
                      {statusTranslate(findTask?.date)}
                    </Typography>
                    <Typography
                      color={'black'}
                      component={'div'}
                      fontSize={18}
                      fontWeight={500}
                      fontStyle={'italic'}
                      textTransform={'capitalize'}>
                      {findTask?.note}
                    </Typography>
                  </PortalCell>
                </Box>
              );
            })}
          </Box>
        ))}
      </Box>
    </Typography>
  );
};
