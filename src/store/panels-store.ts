import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export enum PanelsEnum {
  TODO = 'TODO',
  ROUTINE = 'ROUTINE',
}

type Actions = {
  togglePanel: (panelName: PanelsEnum) => void;
};

type State = {
  panels: PanelsEnum[];
};

export const usePanelsStore = create<State & Actions>()(
  persist(
    immer((set) => ({
      panels: [PanelsEnum.TODO],
      togglePanel: (panelName) =>
        set((store) => {
          if (store.panels.includes(panelName)) {
            store.panels = store.panels.filter((panel) => panel !== panelName);
          } else {
            store.panels = [...store.panels, panelName];
          }
        }),
    })),
    {
      name: 'panels-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
