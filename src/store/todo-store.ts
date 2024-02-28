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
  date: Date;
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
          id: '2fea5f6b-183a-40aa-b9c5-abd893447ea2',
          text: 'Помыть посуду',
          date: new Date(),
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
