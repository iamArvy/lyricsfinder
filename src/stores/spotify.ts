// store/musicStore.ts
import { defineStore } from 'pinia'
import axios from 'axios'

// Define state interface
interface State {
  charts: any | null
  accessToken: string | null
  // loaded: boolean
  searchstate: any | null
  trackstate: any | null
  lyricstate: any | null
  downloadstate: any | null
  albumstate: any | null
  artiststate: any | null
  recommendation: any | null
  newrelease: any | null
  artistalbum: any | null
  artisttop: any | null
}

// Define the store
export const useSpotifyStore = defineStore('spotify', {
  state: (): State => ({
    charts: null,
    accessToken: null,
    // loaded: false,
    searchstate: null,
    trackstate: null,
    lyricstate: null,
    downloadstate: null,
    albumstate: null,
    artiststate: null,
    recommendation: null,
    newrelease: null,
    artistalbum: null,
    artisttop: null
  }),

  getters: {
    recommendationgetter: (state) => state.recommendation,
    artistalbumgetter: (state) => state.artistalbum,
    artisttopgetter: (state) => state.artisttop,
    getnewrelease: (state) => state.newrelease,
    trackresult: (state) => state.searchstate?.tracks.items ?? null,
    albumresult: (state) => state.searchstate?.albums.items ?? null,
    artistresult: (state) => state.searchstate?.artists.items ?? null,
    trackgetter: (state) => state.trackstate,
    lyricsgetter: (state) => state.lyricstate?.lyrics.lines ?? null,
    albumgetter: (state) => state.albumstate,
    artistgetter: (state) => state.artiststate,
    downloadgetter: (state) => state.downloadstate?.audio ?? null
  },

  actions: {
    async getToken() {
      try {
        const key = import.meta.env.VITE_SPOTIFY_KEY
        const id = import.meta.env.VITE_SPOTIFY_ID
        const auth_string = id + ':' + key
        const auth_bytes = new TextEncoder().encode(auth_string)
        const auth_base64 = btoa(String.fromCharCode(...auth_bytes))
        const adata = new URLSearchParams()
        adata.append('grant_type', 'client_credentials')
        const response = await fetch('https://accounts.spotify.com/api/token', {
          method: 'POST',
          headers: {
            Authorization: 'Basic ' + auth_base64,
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: adata
        })
        const data = await response.json()
        return data.access_token
      } catch (error) {
        console.error('Login Error', error)
      }
    },

    async makeRequest(route: string) {
      const token = await this.getToken()
      if (token) {
        try {
          const response = await axios.get(`https://api.spotify.com/v1/${route}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          return response.data
        } catch (error) {
          console.error('Error making request:', error)
          throw error // Re-throw to handle in the calling method
        }
      } else {
        console.error('Access token not found in state')
        throw new Error('Access token not found')
      }
    },

    async getNewRelease() {
      try {
        const data = await this.makeRequest('browse/new-releases')
        this.newrelease = data.albums.items
      } catch (error) {
        console.error('Error getting new albums:', error)
      }
    },

    async getRecommendation(id: string) {
      try {
        const data = await this.makeRequest(`recommendations?seed_tracks=${id}`)
        this.recommendation = data.tracks
        console.log(this.albumgetter)
      } catch (error) {
        console.error('Error getting new albums:', error)
      }
    },
    async getArtistalbum(id: string) {
      try {
        const data = await this.makeRequest(`artists/${id}/albums`)
        this.artistalbum = data.items
      } catch (error) {
        console.error('Error getting new albums:', error)
      }
    },

    async getArtisttop(id: string) {
      try {
        const data = await this.makeRequest(`artists/${id}/related-artists`)
        this.artisttop = data.artists
      } catch (error) {
        console.error('Error getting new albums:', error)
      }
    },

    // async getAuthdetails() {
    //   try {
    //     const authdetails = await axios.get('https://vorteks.pythonanywhere.com/api/detail')
    //     const dataDict: { [key: string]: string } = {}
    //     for (const item of authdetails.data) {
    //       dataDict[item.name] = item.detail
    //     }
    //     const key = dataDict['key']
    //     const client_id = dataDict['spotifyid']
    //     const client_secret = dataDict['spotifykey']
    //     return {
    //       client_id,
    //       client_secret,
    //       key
    //     }
    //   } catch (error) {
    //     console.error(error)
    //   }
    // },

    async getArtist(id: string) {
      try {
        const data = await this.makeRequest(`artists/${id}`)
        this.artiststate = data
      } catch (error) {
        console.error('Error getting new albums:', error)
      }
    },

    async getAlbuminfo(id: string) {
      try {
        const data = await this.makeRequest(`albums/${id}`)
        this.albumstate = data
      } catch (error) {
        console.error('Error getting new albums:', error)
      }
    },

    async getTrackinfo(id: string) {
      try {
        const data = await this.makeRequest(`tracks/${id}`)
        this.trackstate = data
        const alid = data.album.id
        await this.getAlbuminfo(alid)
      } catch (error) {
        console.error('Error getting new albums:', error)
      }
    },

    async tracks(id: string) {
      try {
        await this.getTrackinfo(id)
        await this.getRecommendation(id)
        console.log(this.trackgetter)
      } catch (error) {
        console.error(error)
      }
    },

    async albums(id: string) {
      try {
        await this.getAlbuminfo(id)
        // await this.getNewalbum()
        // this.loaded = true
        console.log(this.trackgetter)
      } catch (error) {
        console.error(error)
        console.log(error)
      }
    },

    async artist(id: string) {
      try {
        await this.getArtist(id)
        await this.getArtistalbum(id)
        await this.getArtisttop(id)
        // this.loaded = true
      } catch (error) {
        console.error(error)
      }
    },

    async search(query: string) {
      try {
        const token = await this.getToken()
        if (token) {
          const options = await axios.get(`https://api.spotify.com/v1/search`, {
            params: { q: query, type: 'track,album,artist', limit: '15' },
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          this.searchstate = options.data
          // this.loaded = true
        }
      } catch (error) {
        console.error(error)
      }
    },

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

    async landing() {
      try {
        // await this.getNewalbum()
        await this.charts()
        // this.loaded = true
      } catch (error) {
        console.error(error)
      }
    }
  }
})
