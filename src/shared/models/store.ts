import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { Service, Univ } from './types';

type SharedState = {
  currentUniv: Univ | null;
  currentService: Service | null;

  setCurrentUniv: (univ: Univ | null) => void;
  setCurrentService: (service: Service | null) => void;
};

export const useSharedStore = create<SharedState>()(
  persist(
    (set) => ({
      currentUniv: null,
      currentService: null,

      setCurrentUniv: (univ) => set({ currentUniv: univ }),
      setCurrentService: (service) => set({ currentService: service }),
    }),
    {
      name: 'shared-store-persist',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        currentUniv: state.currentUniv,
        currentService: state.currentService,
      }),
    }
  )
);
