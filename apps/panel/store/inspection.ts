import { create } from 'zustand'

import { InspectionDTO } from '@/dtos'

type InspectionActions = {
  update: (inspection: InspectionDTO) => void,
  setIsLoading: (value: boolean) => void,
  reset: () => Promise<void>,
}

type InspectionStore = {
  state: {
    inspection: InspectionDTO | null,
    isLoading: boolean,
  },
  action: InspectionActions,
}

export const useInspectionStore = create<InspectionStore>((set) => ({
  state: {
    inspection: null,
    isLoading: false,
  },
  action: {
    update: (updatedInspection) => set((state) => {
      return ({ state: { ...state.state, inspection: updatedInspection } })
    }),

    setIsLoading: (value) => set((state) => {
      return ({ state: { ...state.state, isLoading: value } })
    }),

    reset: async () => set(() => {
      return ({ state: { inspection: null, isLoading: false } })
    })
  }
}))