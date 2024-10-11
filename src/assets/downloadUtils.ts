import JSZip from 'jszip'
import MP3Tag from 'mp3tag.js'
import axios from 'axios'
import { ref } from 'vue'

const getTrackLyrics = async (id: string): Promise<string | undefined> => {
  interface LyricLine {
    startTimeMs: string
    endTimeMs: string
    words: string
    syllables?: string[]
  }

  const lyricsArray = ref<LyricLine[]>([])
  try {
    const key = import.meta.env.VITE_RAPID_API_KEY
    const response = await axios.get('https://spotify23.p.rapidapi.com/track_lyrics/', {
      params: { id },
      headers: {
        'X-RapidAPI-Key': key,
        'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
      }
    })

    lyricsArray.value = response.data.lyrics.lines
    if (lyricsArray.value.length === 0) {
      return 'No Lyrics found for this song yet - Check back later'
    }
    return lyricsArray.value.map((line) => line.words).join('\n')
  } catch (error) {
    console.error('Error fetching lyrics:', error)
  }
  return undefined
}

const getImageData = async (cover: string): Promise<Uint8Array> => {
  const response = await fetch(cover)
  if (!response.ok) {
    throw new Error('Failed to fetch cover image')
  }
  const imageBlob = await response.blob()

  return new Promise<Uint8Array>((resolve) => {
    const imgReader = new FileReader()
    imgReader.onload = (e) => resolve(new Uint8Array(e.target!.result as ArrayBuffer))
    imgReader.readAsArrayBuffer(imageBlob)
  })
}

const getDownloadData = async (requestInfo: {
  pathname: string
  params: { name: string; value: string }[]
}): Promise<any> => {
  const url = new URL('https://spotify-downloader9.p.rapidapi.com')
  url.pathname = requestInfo?.pathname

  requestInfo?.params.forEach((param) => url.searchParams.append(param.name, param.value))

  try {
    const key = import.meta.env.VITE_RAPID_API_KEY
    const response = await axios.get(url.toString(), {
      headers: {
        'X-RapidAPI-Key': key,
        'X-RapidAPI-Host': 'spotify-downloader9.p.rapidapi.com'
      }
    })

    return response.data.data
  } catch (error) {
    console.error('Error fetching download data:', error)
    throw error // Re-throw error for upstream handling
  }
}

const getAudioBlob = async (downloadLink: string): Promise<Blob> => {
  const response = await fetch(downloadLink)
  if (!response.ok) {
    throw new Error('Failed to fetch audio file')
  }
  return response.blob()
}

const getTaggedBlob = (
  audioBlob: Blob,
  data: {
    title: string
    artist: string
    album: string
    albumartist?: string
    year: string
    picture?: { format: string; data: Uint8Array }
    lyrics?: string
    track?: number
  }
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = async (event) => {
      const arrayBuffer = event.target!.result as ArrayBuffer
      const mp3tag = new MP3Tag(arrayBuffer, true)

      mp3tag.read()
      if (mp3tag.error) {
        return reject(new Error(mp3tag.error))
      }

      // Set ID3 tags
      mp3tag.tags.title = data.title
      mp3tag.tags.artist = data.artist
      if (data.album) mp3tag.tags.album = data.album
      if (data.year) mp3tag.tags.year = data.year

      // Optional fields
      if (data.track) mp3tag.tags.track = data.track.toString()
      if (mp3tag.tags.v2) {
        if (data.albumartist) mp3tag.tags.v2.TPE2 = data.albumartist

        if (data.picture)
          mp3tag.tags.v2.APIC = [
            {
              format: data.picture.format,
              type: 3,
              description: 'Cover',
              data: Array.from(data.picture.data)
            }
          ]
        if (data.lyrics)
          mp3tag.tags.v2.USLT = [
            {
              language: '', // Optional: add language code if needed
              descriptor: 'lyrics',
              text: data.lyrics
            }
          ]
      }

      mp3tag.save()
      resolve(new Blob([mp3tag.buffer], { type: 'audio/mp3' }))
    }

    reader.onerror = (e) => reject(e)
    reader.readAsArrayBuffer(audioBlob)
  })
}

const download = (url: string, filename: string) => {
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
}

// Assuming you are using Vue 3 with the Composition API

const createAudio = async (audio: {
  id: string
  title: string
  downloadLink: string
  artist: string
  album: string
  cover: Uint8Array | null
  releaseDate: string
  albumartist?: string | null
  track?: number | null
}) => {
  // Validate input
  if (!audio) {
    throw new Error('Missing required audio information.')
  }

  const lyrics = ref<string | undefined>(undefined)
  const audioBlob = ref<Blob | null>(null)

  try {
    const { id, title, downloadLink, artist, album, cover, releaseDate, albumartist, track } = audio

    // Fetch the audio blob
    audioBlob.value = await getAudioBlob(downloadLink)
    // Fetch the track lyrics
    lyrics.value = await getTrackLyrics(id)

    // Prepare data for tagging
    const data = {
      title: title,
      artist: artist,
      album: album,
      year: releaseDate.split('-')[0], // Extract year from release date
      picture: cover ? { format: 'image/jpeg', data: cover } : undefined,
      lyrics: lyrics.value,
      albumartist: albumartist ? albumartist : undefined,
      track: track ? track : undefined
    }

    // Create a tagged music blob
    const musicBlob = await getTaggedBlob(audioBlob.value, data)
    return musicBlob
  } catch (error) {
    console.error('Error creating audio:', error)
    throw new Error('Failed to create audio. Please try again.')
  }
}

const downloadAudio = async (
  id: string,
  updateProgress: (message: string) => void // Progress callback
) => {
  // Validate input
  if (!id) {
    return 'Audio ID is required.'
  }

  const imageData = ref<Uint8Array | null>(null)

  try {
    // Fetch download data
    const downloaddata = await getDownloadData({
      pathname: 'downloadSong',
      params: [{ name: 'songId', value: id }]
    })

    const { title, downloadLink, artist, album, cover, releaseDate } = downloaddata
    console.log(downloaddata)
    // Fetch the cover image if available
    if (cover) {
      imageData.value = await getImageData(cover)
    }

    // Prepare audio data for creation
    const data = {
      id: id,
      title: title,
      downloadLink: downloadLink,
      artist: artist,
      album: album,
      cover: imageData.value,
      releaseDate: releaseDate.split('-')[0] // Extract year from release date
    }

    updateProgress(`Compiling song`)
    // Create audio with tags
    const musicBlob = await createAudio(data)
    if (!musicBlob) {
      return 'Download failed'
    }

    // Create object URL for the audio blob
    const music = URL.createObjectURL(musicBlob)
    download(music, `${title}.mp3`)
    URL.revokeObjectURL(music) // Clean up object URL

    return 'Download has started'
  } catch (error) {
    console.error('Error downloading audio:', error)
    return 'Download failed'
  }
}

const downloadAlbum = async (
  id: string,
  updateProgress: (message: string) => void // Progress callback
) => {
  const zip = new JSZip()

  const imageData = ref<Uint8Array | null>(null)

  // Validate input
  if (!id) {
    throw new Error('Album ID is required.')
  }

  try {
    // Fetch album data
    const album = await getDownloadData({
      pathname: 'downloadAlbum',
      params: [{ name: 'albumId', value: id }]
    })

    if (!album) {
      throw new Error('Album not found.')
    }

    const { artist, releaseDate, cover, title } = album.albumDetails
    const totalTracks = album.songs.length

    // Fetch cover image if available
    if (cover) {
      imageData.value = await getImageData(cover)
    }

    // Download each track and add to the zip file
    for (let i = 0; i < totalTracks; i++) {
      const track = album.songs[i]
      const { title: trackTitle, downloadLink, id: trackId } = track

      const data = {
        id: trackId,
        track: i + 1,
        title: trackTitle,
        downloadLink: downloadLink,
        album: title,
        albumartist: artist,
        artist: artist,
        cover: imageData.value,
        releaseDate: releaseDate.split('-')[0] // Extract year from release date
      }

      updateProgress(`Downloading track ${i + 1} of ${totalTracks}: ${trackTitle}`)
      const musicBlob = await createAudio(data)

      if (musicBlob) {
        zip.file(`${trackTitle}.mp3`, musicBlob)
      } else {
        console.error(`Failed to create audio for track: ${trackTitle}`)
      }
    }

    updateProgress('Compiling album tracks into a ZIP file...')
    const zipBlob = await zip.generateAsync({ type: 'blob' })

    // Create a downloadable link for the ZIP file
    const url = URL.createObjectURL(zipBlob)
    download(url, `${title}.zip`)
    URL.revokeObjectURL(url) // Clean up object URL
    updateProgress('Download has started')
  } catch (error) {
    throw new Error('Download failed:' + error)
  }
}

export { downloadAlbum, downloadAudio }
