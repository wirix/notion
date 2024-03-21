import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export interface CardCoords {
  nextX: number;
  nextY: number;
  startX: number;
  startY: number;
  lastX: number;
  lastY: number;
}

export interface CardSize {
  width: number;
  height: number;
}

export interface CardCoordsAndSize {
  coords: CardCoords;
}

type Actions = {
  changeCoords: (position: CardCoords) => void;
};

type State = {
  card: CardCoordsAndSize;
};

export const useCard = create<State & Actions>()(
  persist(
    immer((set) => ({
      card: {
        coords: { nextX: 0, nextY: 0, startX: 0, startY: 0, lastX: 0, lastY: 0 },
      },
      changeCoords: (coords: CardCoords) => {
        set((state) => {
          state.card.coords = coords;
        });
      },
    })),
    { name: 'card-storage', storage: createJSONStorage(() => sessionStorage) },
  ),
);
