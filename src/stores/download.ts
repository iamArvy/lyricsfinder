import { defineStore } from 'pinia'
import {
  downloadAlbum as downloadAlbumUtil,
  downloadAudio as downloadAudioUtil
} from '@/assets/downloadUtils'

// Define the State interface
interface State {
  isDownloading: boolean
  downloadProgress: string
  error: any
}

// Define the store
export const useDownloadStore = defineStore('download', {
  state: (): State => ({
    isDownloading: false,
    downloadProgress: '',
    error: null
  }),
  actions: {
    async download(id: string, type: string) {
      try {
        // Accessing state properties directly through `this`
        this.isDownloading = true
        this.error = null
        this.downloadProgress = 'Starting Download'

        if (type === 'audio') {
          await downloadAudioUtil(id, (progress) => {
            this.downloadProgress = progress
          })
        } else if (type === 'album') {
          await downloadAlbumUtil(id, (progress) => {
            this.downloadProgress = progress
          })
        }

        this.isDownloading = false
        this.downloadProgress = 'Download Complete'
      } catch (error) {
        this.error = error
        this.isDownloading = false // Ensure isDownloading is reset on error
      }
    }
  }
})
