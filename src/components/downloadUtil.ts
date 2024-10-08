import JSZip from 'jszip'
import MP3Tag from 'mp3tag.js'

const getImageData = (cover: string) =>
  fetch(cover)
    .then((response) => response.blob())
    .then(
      (imageBlob) =>
        new Promise<Uint8Array>((res) => {
          const imgReader = new FileReader()
          imgReader.onload = (e) => res(new Uint8Array(e.target!.result as ArrayBuffer))
          imgReader.readAsArrayBuffer(imageBlob)
        })
    )

const getAudioBlob = async (
  downloadLink: string,
  data: {
    title: string
    artist: string
    album: string
    albumartist?: string
    year: string
    picture?: { format: string; data: Uint8Array }
  }
) => {
  const response = await fetch(downloadLink)
  if (!response.ok) {
    throw new Error('Failed to fetch audio file')
  }
  const blob = await response.blob()

  const taggedAudioBlob = await tagAudioWithImage(blob, data)
  return taggedAudioBlob
}

const download = (url: string, filename: string) => {
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
}

const downloadAlbum = async (album: {
  albumDetails: { artist: string; releaseDate: string; cover: string; title: string }
  songs: {
    artist: string
    title: string
    album: string
    downloadLink: string
    releaseDate: string
    cover: string
  }[]
}): Promise<string> => {
  const zip = new JSZip()
  const { artist, releaseDate, cover, title } = album.albumDetails

  let imageData: Uint8Array | null = null

  if (cover) {
    imageData = await getImageData(cover)
  }

  for (const track of album.songs) {
    const { title, downloadLink } = track

    const data = {
      title: title,
      artist: artist,
      album: album.albumDetails.title,
      albumartist: album.albumDetails.artist,
      year: releaseDate.split('-')[0],
      picture: imageData ? { format: 'image/jpeg', data: imageData } : undefined
    }
    const audioBlob = await getAudioBlob(downloadLink, data)
    zip.file(`${title}.mp3`, audioBlob)
  }
  const zipBlob = await zip.generateAsync({ type: 'blob' })
  const url = URL.createObjectURL(zipBlob)
  download(url, `${title}.zip`)
  URL.revokeObjectURL(url)
  return 'Download has started'
}

const tagAudioWithImage = (
  audioBlob: Blob,
  data: {
    title: string
    artist: string
    album: string
    albumartist?: string
    year: string
    picture?: { format: string; data: Uint8Array }
  }
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = async (event) => {
      const arrayBuffer = event.target!.result as ArrayBuffer

      // Initialize MP3Tag with verbose logging
      const mp3tag = new MP3Tag(arrayBuffer, true)

      // Read the tags from the buffer
      mp3tag.read()

      // Check for errors
      if (mp3tag.error !== '') {
        return reject(new Error(mp3tag.error))
      }

      // Set ID3 tags
      mp3tag.tags.title = data.title
      mp3tag.tags.artist = data.artist
      mp3tag.tags.album = data.album
      if (data.albumartist) {
        // @ts-ignore
        mp3tag.tags.v2.TPE2 = data.albumartist
      }

      if (data.year) {
        mp3tag.tags.year = data.year
      }
      if (data.picture) {
        // @ts-ignore
        mp3tag.tags.v2.APIC = [
          {
            format: data.picture.format,
            type: 3,
            description: 'Cover',
            data: Array.from(data.picture.data)
          }
        ]
      }
      mp3tag.save()
      const taggedAudioBlob = new Blob([mp3tag.buffer], { type: 'audio/mp3' })
      resolve(taggedAudioBlob)
    }

    reader.onerror = (e) => reject(e)
    reader.readAsArrayBuffer(audioBlob)
  })
}

const downloadAudio = async (link: {
  title: string
  downloadLink: string
  artist: string
  album: string
  cover: string
  releaseDate: string
}): Promise<string> => {
  const { title, downloadLink, artist, album, cover, releaseDate } = link

  try {
    let imageData: Uint8Array | null = null
    if (cover) {
      imageData = await getImageData(cover)
    }

    const data = {
      title: title,
      artist: artist,
      album: album,
      year: releaseDate.split('-')[0],
      picture: imageData ? { format: 'image/jpeg', data: imageData } : undefined
    }

    const audioBlob = await getAudioBlob(downloadLink, data)
    const url = URL.createObjectURL(audioBlob)
    download(url, `${title}.mp3`)
    URL.revokeObjectURL(url)
    return 'Download has started'
  } catch (error) {
    console.error('Download failed:', error)
    return 'Something went wrong'
  }
}

export { downloadAlbum, downloadAudio }
