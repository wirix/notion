import { DateRange } from '@mui/x-date-pickers-pro';
import dayjs, { Dayjs } from 'dayjs';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export interface Todo {
  id: string;
  text: string;
  date: DateRange<Dayjs>;
  color?: keyof typeof colors;
  note: string;
}

type Actions = {
  addTodo: (todo: Todo) => void;
  updateTodo: (id: string, field: Partial<Pick<Todo, keyof Todo>>) => void;
  deleteTodo: (id: string) => void;
};

type State = {
  todos: Todo[];
};

const colors = {
  red: '#f44336',
  pink: '#e91e63',
  purple: '#9c27b0',
  deepPurple: '#673ab7',
  indigo: '#3f51b5',
  blue: '#2196f3',
  lightBlue: '#03a9f4',
  cyan: '#00bcd4',
  lightGreen: '#8bc34a',
  lime: '#cddc39',
  yellow: '#ffeb3b',
  amber: '#ffc107',
  orange: '#ff9800',
  deepOrange: '#ff5722',
};

const getRandomColor = () => {
  const keys = Object.keys(colors);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  return colors[randomKey];
};

export const useTodoStore = create<State & Actions>()(
  persist(
    immer((set) => ({
      todos: [
        {
          id: '42a44fcb-48bc-471b-bb34-15b4351ab80d',
          text: 'Помыть посуду',
          date: [dayjs('2024-05-09').set('hour', 10), dayjs('2024-05-09').set('hour', 14)],
          color: getRandomColor(),
          note: 'Очень важно',
        },
        {
          id: '42a44fcb-48bc-471b-bb34-15b4351ab81d',
          text: 'Помыть пол',
          date: [dayjs('2024-05-10').set('hour', 12), dayjs('2024-05-10').set('hour', 20)],
          color: getRandomColor(),
          note: 'Очень важно',
        },
      ],
      addTodo: (newTodo) =>
        set(
          (store) =>
            void {
              todos: store.todos.push(
                newTodo.color ? newTodo : { ...newTodo, color: getRandomColor() },
              ),
            },
        ),
      updateTodo: (id, field) =>
        set((store) => {
          const updatedTodos = store.todos.map((todo) => {
            if (todo.id === id) {
              return { ...todo, ...field };
            }
            return todo;
          });
          return { todos: updatedTodos };
        }),
      deleteTodo: (id) =>
        set((store) => ({
          todos: store.todos.filter((todo) => todo.id !== id),
        })),
    })),
    {
      name: 'todo-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
