import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { PanelsEnum } from './panels-store';

interface Coords {
  dx: number;
  dy: number;
}

interface PanelCoords {
  coords: Coords;
}

type State = {
  panel: PanelCoords;
};

type Actions = {
  changeCoords: (coords: Coords) => void;
};

export const usePanelCoordsStore = (panel: PanelsEnum) =>
  create<State & Actions>()(
    persist(
      immer((set) => ({
        panel: {
          coords: { dx: 0, dy: 0 },
        },
        changeCoords: (coords: Coords) => {
          set((store) => {
            store.panel.coords = coords;
          });
        },
      })),
      { name: `${panel}-panel-coords-storage`, storage: createJSONStorage(() => sessionStorage) },
    ),
  );
