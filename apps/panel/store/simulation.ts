import { create } from 'zustand'

import { SimulationDTO } from '@/dtos/simulation'

type SimulationActions = {
  update: (simulation: SimulationDTO) => void,
  setIsLoading: (value: boolean) => void,
}

type SimulationStore = {
  state: {
    simulation: SimulationDTO | null,
    isLoading: boolean,
  },
  action: SimulationActions,
}

export const useSimulationStore = create<SimulationStore>((set) => ({
  state: {
    simulation: null,
    isLoading: false,
  },
  action: {
    update: (updatedSimulation: SimulationDTO) => set((state) => {
      return ({ state: { ...state.state, simulation: updatedSimulation } })
    }),

    setIsLoading: (value) => set((state) => {
      return ({ state: { ...state.state, isLoading: value } })
    })
  }
}))