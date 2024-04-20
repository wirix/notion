import { days } from '../../../store';
import { useCallback, useState } from 'react';
import { ButtonIcon } from '../../ButtonIcon';
import { Box, TextField, Typography } from '@mui/material';
import { weekdays } from '../../Panels/PanelRoutine/TableRoutine';
import { Modal } from '../../Modal';
import { Button } from '../../Button';
import { useSelectElements } from '../hooks';
import { NextTasks } from '../NextTasks';

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
    functions: { handleMouseDown, handleMouseUp, handleMouseMove },
    state: { elements, selectedColIndex },
  } = useSelectElements();
  console.log(elements, selectedColIndex);

  const [weekOffset, setWeekOffset] = useState(0);
  const [toggleModal, setToggleModal] = useState(false);

  const handleSetWeekOffset = (step: -1 | 1) => {
    setWeekOffset(weekOffset + step);
  };

  const openModal = () => {
    if (elements.length) setToggleModal(true);
  };

  const createTask = () => {
    // логика на доваление в zus данных
    console.log(elements);
    setToggleModal(false);
    handleMouseUp();
  };

  const cancelTask = useCallback(() => {
    setToggleModal(false);
    handleMouseUp();
  }, []);

  const getDatesForWeek = (weekOffset: number) => {
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
        day: day.getDate(),
        dayName,
      };
    });

    return datesForWeek;
  };
  const datesForWeek = getDatesForWeek(weekOffset);

  return (
    <Typography component={'div'} display={'flex'} color={'black'}>
      <Modal isOpen={toggleModal} onClose={cancelTask}>
        <TextField sx={{ mb: 2 }} label="Задача" variant="outlined" />
        <Button onClick={createTask}>Создать</Button>
      </Modal>

      <NextTasks width={'300px'} mr={1} />

      <Box height={'calc(100vh - 90px)'} display={'flex'} flexDirection={'column'} flexGrow={1}>
        <Box display={'flex'}>
          <ButtonIcon onClick={() => handleSetWeekOffset(-1)} icon="trash" appearance="danger" />
          <ButtonIcon onClick={() => handleSetWeekOffset(1)} icon="trash" appearance="danger" />
        </Box>
        <Box display={'grid'} gridTemplateColumns={`repeat(${DAYS_COUNT + 1}, 1fr)`} flexGrow={1}>
          <Box></Box>
          {datesForWeek.map((date, index) => (
            <Box
              textTransform={'capitalize'}
              key={index}
              display={'flex'}
              flexDirection={'column'}
              justifyContent={'space-between'}
              height={'100%'}
              sx={{ userSelect: 'none' }}>
              <Typography component={'div'}>{date.dayName}</Typography>
              <Typography component={'div'} fontSize={32}>
                {date.day}
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
              <Box
                key={index}
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'space-between'}
                textTransform={'uppercase'}
                py={4}
                sx={{ userSelect: 'none' }}>
                {hour.name}
              </Box>
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
                }}>
                {new Array(HOURS_COUNT).fill(null).map((_, indexHour) => (
                  <div
                    key={indexHour}
                    onMouseMove={() => handleMouseMove(indexHour, indexDay)}
                    onMouseDown={() => handleMouseDown(indexHour, indexDay)}
                    onMouseUp={openModal}>
                    <Box
                      bgcolor={
                        selectedColIndex === indexDay && elements.includes(indexHour)
                          ? 'primary.light'
                          : 'primary.main'
                      }
                      borderTop={1}
                      py={4}
                      sx={{ userSelect: 'none' }}>
                      &nbsp;
                    </Box>
                  </div>
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Typography>
  );
};
