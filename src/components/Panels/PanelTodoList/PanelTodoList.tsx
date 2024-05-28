import { useTodoStore } from '../../../store';
import { ButtonIcon, EditableText } from '../..';
import { Box, Button, Checkbox, Grid } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import { Fragment, useCallback, useState } from 'react';
import { PickerCalendar } from '.';
import { DateRange } from '@mui/x-date-pickers-pro';
import dayjs, { Dayjs } from 'dayjs';

export const PanelTodoList = () => {
  const { todos, updateTodo, addTodo, deleteTodo } = useTodoStore();

  const [choiceIds, setChoiceIds] = useState<string[]>([]);

  const handleCreateTodo = () => {
    addTodo({
      id: crypto.randomUUID(),
      text: '',
      date: [dayjs(), dayjs()],
      note: '',
    });
  };

  const handleDeleteTodo = () => {
    choiceIds.forEach((id) => {
      deleteTodo(id);
    });
    setChoiceIds([]);
  };

  const handleUpdateText = useCallback((id: string, text: string) => {
    updateTodo(id, { text });
  }, []);

  const handleUpdateDate = useCallback((id: string, date: DateRange<Dayjs>) => {
    updateTodo(id, { date });
  }, []);

  return (
    <Fragment>
      <Box display={'flex'} justifyContent={'space-between'} marginBottom={2}>
        <Checkbox
          disabled={todos.length === 0}
          checked={todos.length > 0 && todos.length === choiceIds.length}
          sx={{ pl: 2 }}
          onChange={(e) => {
            if (e.target.checked && todos.length > 0) {
              const todoIds = todos.map((todo) => todo.id);
              setChoiceIds(todoIds);
            } else {
              setChoiceIds([]);
            }
          }}
        />
        <ButtonIcon
          disabled={choiceIds.length === 0}
          icon={'trash'}
          appearance={'danger'}
          onClick={handleDeleteTodo}>
          удалить
        </ButtonIcon>
      </Box>
      <Grid container columns={16} flexDirection={'column'}>
        <Grid item xs={16}>
          <Box display={'flex'} flexDirection={'column'}>
            {todos.map((todo) => (
              <Box
                key={todo.id}
                padding={1}
                display={'flex'}
                alignItems={'center'}
                bgcolor={blueGrey[50]}
                borderRadius={2}
                mb={1}>
                <Checkbox
                  checked={choiceIds.includes(todo.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setChoiceIds([...choiceIds, todo.id]);
                    } else {
                      setChoiceIds(choiceIds.filter((id) => id !== todo.id));
                    }
                  }}
                />
                <Box flexGrow={1} p={0} px={1}>
                  <EditableText id={todo.id} updateText={handleUpdateText}>
                    {todo.text}
                  </EditableText>
                </Box>
                <Box width={150}></Box>
                <Box p={0} px={1}>
                  <PickerCalendar id={todo.id} updateStore={handleUpdateDate} date={todo.date} />
                </Box>
              </Box>
            ))}
          </Box>
        </Grid>
        <Grid item xs={16}>
          <Box p={1} bgcolor={blueGrey[50]} borderRadius={2}>
            <Button onClick={handleCreateTodo}>Новая задача</Button>
          </Box>
        </Grid>
      </Grid>
    </Fragment>
  );
};
