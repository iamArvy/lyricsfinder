// store/musicStore.ts
import { defineStore } from 'pinia'
import axios from 'axios'

// Define state interface
interface State {
  chart: any | null
}

// Define the store
export const useGeniusStore = defineStore('genius', {
  state: (): State => ({
    chart: null
  }),

  getters: {
    getchart: (state) => state.chart?.chart_items ?? null
  },

  actions: {
    async getChart() {
      try {
        const key = import.meta.env.VITE_RAPID_API_KEY
        const options = await axios.get('https://genius-song-lyrics1.p.rapidapi.com/chart/songs/', {
          params: { time_period: 'day', per_page: '20', page: '1' },
          headers: {
            'X-RapidAPI-Key': key,
            'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
          }
        })
        this.chart = options.data
      } catch (error) {
        console.error(error)
      }
    }
  }
})
