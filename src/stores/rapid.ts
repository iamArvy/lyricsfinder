// store/musicStore.ts
import { defineStore } from 'pinia'
import axios from 'axios'

// Define state interface
interface State {
  lyrics: any | null
  downloadstate: any | null
}

// Define the store
export const useRapidStore = defineStore('rapid', {
  state: (): State => ({
    lyrics: null,
    downloadstate: null
  }),

  getters: {
    lyricsgetter: (state) => state.lyrics?.lyrics.lines ?? null,
    downloadgetter: (state) => state.downloadstate?.audio ?? null
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
    }

    // async downloader(id: string) {
    //   try {
    //     const { key } = await this.getAuthdetails()
    //     const download = await axios.get(
    //       'https://spotify-downloader3.p.rapidapi.com/spotify/download/',
    //       {
    //         params: { url: `https://open.spotify.com/track/${id}` },
    //         headers: {
    //           'X-RapidAPI-Key': key,
    //           'X-RapidAPI-Host': 'spotify-downloader3.p.rapidapi.com'
    //         }
    //       }
    //     )
    //     this.downloadstate = download.data
    //     this.loaded = true
    //   } catch (error) {
    //     console.error(error)
    //   }
    // },
  }
})
