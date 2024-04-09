import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { PanelsEnum } from './panels-store';

export interface Size {
  width: number | undefined;
}

type State = {
  size: Size;
};

type Actions = {
  changeSize: (size: Size) => void;
};

export const useSizeStore = (panel: PanelsEnum, width = 600) =>
  create<State & Actions>()(
    persist(
      immer((set) => ({
        size: {
          width,
        },
        changeSize: (size: Size) => {
          set((store) => {
            store.size = size;
          });
        },
      })),
      { name: `${panel}-panel-size-storage`, storage: createJSONStorage(() => sessionStorage) },
    ),
  );
