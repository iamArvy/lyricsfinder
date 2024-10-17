import { defineStore } from 'pinia'

interface State {
  loading: boolean | null // Use 'boolean' (lowercase) for the type
}

export const useLoadingStore = defineStore('loader', {
  state: (): State => ({
    loading: true
  }),
  actions: {
    setLoading(state: boolean) {
      // Change the parameter type to 'boolean'
      this.loading = state
    }
  }
})
