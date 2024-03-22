import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export interface CardCoords {
  dx: number;
  dy: number;
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
        coords: { dx: 0, dy: 0 },
      },
      changeCoords: (coords: CardCoords) => {
        set((state) => {
          state.card.coords = coords;
        });
      },
    })),
    { name: 'panels-coords-storage', storage: createJSONStorage(() => sessionStorage) },
  ),
);
