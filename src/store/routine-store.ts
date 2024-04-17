import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export const days = {
  monday: 'monday',
  tuesday: 'tuesday',
  wednesday: 'wednesday',
  thursday: 'thursday',
  friday: 'friday',
  saturday: 'saturday',
  sunday: 'sunday',
} as const;

export type Day = keyof typeof days;

export interface Task {
  id: string;
  text: string;
  completed: {
    [key: string]: boolean;
  };
}

type Actions = {
  addTask: () => void;
  updateText: (id: string, text: string) => void;
  toggleTask: (id: string, day: Day) => void;
};

type State = {
  tasks: Task[];
};

export const useRoutineStore = create<State & Actions>()(
  persist(
    immer((set) => ({
      tasks: [
        {
          id: crypto.randomUUID(),
          text: 'Помыть посуду',
          completed: {
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false,
            sunday: false,
          },
        },
      ],
      addTask: () => {
        set((store) => {
          store.tasks = [
            ...store.tasks,
            {
              id: crypto.randomUUID(),
              text: '',
              completed: {
                monday: false,
                tuesday: false,
                wednesday: false,
                thursday: false,
                friday: false,
                saturday: false,
                sunday: false,
              },
            },
          ];
        });
      },
      updateText: (id, text) => {
        set((store) => {
          store.tasks = store.tasks.map((task) => {
            if (task.id === id) {
              return { ...task, text };
            }
            return task;
          });
        });
      },
      toggleTask: (id, day) => {
        set((store) => {
          store.tasks = store.tasks.map((task) => {
            if (task.id === id) {
              return {
                ...task,
                completed: {
                  ...task.completed,
                  [day]: !task.completed[day],
                },
              };
            }
            return task;
          });
        });
      },
    })),

    {
      name: 'routine-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
