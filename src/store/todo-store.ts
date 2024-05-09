import { DateRange } from '@mui/x-date-pickers-pro';
import dayjs, { Dayjs } from 'dayjs';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export enum StatusTodoEnum {
  queue = 'queue',
  inProgress = 'inProgress',
  completed = 'completed',
}

export interface Todo {
  id: string;
  text: string;
  date: DateRange<Dayjs>;
  status: StatusTodoEnum;
}

type Actions = {
  addTodo: (todo: Todo) => void;
  updateTodo: (id: string, field: Partial<Pick<Todo, keyof Todo>>) => void;
  deleteTodo: (id: string) => void;
};

type State = {
  todos: Todo[];
};

export const useTodoStore = create<State & Actions>()(
  persist(
    immer((set) => ({
      todos: [
        {
          id: '42a44fcb-48bc-471b-bb34-15b4351ab80d',
          text: 'Помыть посуду',
          date: [dayjs('2024-05-05').set('hour', 10), dayjs('2024-05-05').set('hour', 13)],
          status: StatusTodoEnum.inProgress,
        },
      ],
      addTodo: (newTodo) => set((store) => void { todos: store.todos.push(newTodo) }),
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
