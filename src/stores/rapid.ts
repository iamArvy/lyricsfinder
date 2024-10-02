// store/musicStore.ts
import { defineStore } from 'pinia'
import axios from 'axios'

// Define state interface
interface State {
  lyrics: any | null
  download: any | null
}

// Define the store
export const useRapidStore = defineStore('rapid', {
  state: (): State => ({
    lyrics: null,
    download: null
  }),

  getters: {
    lyricsgetter: (state) => state.lyrics?.lyrics.lines ?? null,
    downloadgetter: (state) => state.download?.downloadLink ?? null
  },

  actions: {
    async getAuthdetails() {
      try {
        const key = import.meta.env.VITE_RAPID_KEY
        // const authdetails = await axios.get('https://vorteks.pythonanywhere.com/api/detail')
        // const dataDict: { [key: string]: string } = {}
        // for (const item of authdetails.data) {
        //   dataDict[item.name] = item.detail
        // }
        // const key = dataDict['key']
        // const client_id = dataDict['spotifyid']
        // const client_secret = dataDict['spotifykey']
        return {
          //   client_id,
          //   client_secret,
          key
        }
      } catch (error) {
        console.error(error)
      }
    },

    async getLyrics(id: string) {
      try {
        const key = import.meta.env.VITE_RAPID_API_KEY
        const options = await axios.get('https://spotify23.p.rapidapi.com/track_lyrics/', {
          params: { id },
          headers: {
            'X-RapidAPI-Key': key,
            'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
          }
        })
        this.lyrics = options.data
      } catch (error) {
        console.error(error)
      }
    },

    async downloader(requestInfo: { pathname: string; params: { name: string; value: string }[] }) {
      console.log(requestInfo)
      const url = new URL('https://spotify-downloader9.p.rapidapi.com')
      url.pathname = requestInfo?.pathname
      requestInfo?.params.forEach((param) => url.searchParams.append(param.name, param.value))

      try {
        const key = import.meta.env.VITE_RAPID_API_KEY
        const download = await axios.get(url.toString(), {
          headers: {
            'X-RapidAPI-Key': key,
            'X-RapidAPI-Host': 'spotify-downloader9.p.rapidapi.com'
          }
        })

        this.download = download.data.data
        console.log(this.download)
      } catch (error) {
        console.error(error)
      }
    }
  }
})
