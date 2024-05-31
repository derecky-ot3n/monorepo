import { create } from 'zustand'

type TracingActions = {
  setBackRoute: (route: string) => void
}

type TracingStore = {
  state: {
    backRoute: string | null,
  },
  action: TracingActions,
}

export const useTracingStore = create<TracingStore>((set) => ({
  state: {
    backRoute: null,
  },
  action: {
    setBackRoute: (route) => set((state) => {
      return ({ state: { ...state.state, backRoute: route } })
    }),
  }
}))