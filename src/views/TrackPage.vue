<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useSpotifyStore } from '@/stores/spotify'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'

import { useRapidStore } from '@/stores/rapid'
// @ts-ignore

import AppLayout from '@/components/AppLayout.vue'
// @ts-ignore

import PageHero from '@/components/PageHero.vue'
// @ts-ignore

import TrackLyrics from '@/components/TrackLyrics.vue'
// @ts-ignore

import MoreInfo from '@/components/MoreInfo.vue'
// @ts-ignore

import ScrollerItem from '@/components/ScrollerItem.vue'
// @ts-ignore

import DialogModal from '@/components/DialogModal.vue'
import MyLoader from '@/components/MyLoader.vue'
import DownloadButton from '@/components/DownloadButton.vue'
const spotify = useSpotifyStore()
const rapid = useRapidStore()
const route = useRoute()
const itemId = route.query.id as string
const loaded = ref(false)
const swiperOptions = ref({
  // slidesPerView: 4,
  spaceBetween: 50,
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  breakpoints: {
    // Define settings for specific screen sizes
    1100: {
      slidesPerView: 4,
      spaceBetween: 30
    },
    800: {
      slidesPerView: 3,
      spaceBetween: 20
    },
    570: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    450: {
      slidesPerView: 1,
      spaceBetween: 10
    }
  }
})
onMounted(async () => {
  try {
    await spotify.tracks(itemId)
    await rapid.getLyrics(itemId)
    track.value = spotify.trackgetter || null
    album.value = spotify.albumgetter.tracks.items || null
    lyrics.value = rapid.lyricsgetter || null
    recommendations.value = spotify.recommendationgetter || null
    loaded.value = true
  } catch (error) {
    console.error('Error fetching track data:', error)
  }
})
const track = ref<{
  id: number
  name?: string
  artists?: any[]
  release_date?: string
  external_urls?: { spotify: string }
  track_number?: number
  preview_url?: string
  uri?: string
  album?: {
    images?: { url?: string }[]
    release_date?: string
    album_type?: string
    id?: string
    total_tracks?: string
  }
  popularity?: number
} | null>(null)

const album = ref<
  | {
      images: { url: string }[]
      name?: string
      artists?: { name: string }[]
      followers: string
      id: number
      release_date?: string
      external_urls?: { spotify: string }
    }[]
  | null
>(null)

const lyrics = ref<any[] | null>(null)

const recommendations = ref<
  | {
      album?: { images: { url: string }[] }
      name?: string
      id?: number
      artists?: { name: string }[]
    }[]
  | null
>(null)

const loading = ref(false)
const openModal = ref(false)
const resp = ref<string>('')
const download = async () => {
  try {
    loading.value = true
    openModal.value = true
    await rapid.downloader({
      pathname: 'downloadSong',
      params: [{ name: 'songId', value: itemId }]
    })
    const link = ref(null)
    link.value = rapid.downloadgetter
    if (link.value) {
      console.log(link)
      const newTab = window.open(link.value, '_blank')

      if (!newTab) {
        resp.value = 'Please allow pop-ups for this website'
      } else {
        resp.value = 'Download has Started'
      }
    }
    loading.value = false
  } catch (error) {
    resp.value = 'Something went Wrong'
    console.error('Error getting download link', error)
  }
}
const closeModal = () => {
  openModal.value = false
}
</script>

<template>
  <AppLayout :loaded="loaded">
    <DialogModal :show="openModal" :close="closeModal" :title="track?.name">
      <MyLoader v-if="loading" />
      <span v-else>{{ resp }}</span>
    </DialogModal>
    <PageHero
      v-if="track != null"
      :name="track?.name"
      :image="track?.album?.images?.[1]?.url"
      :artists="track?.artists"
      :releaseDate="track?.album?.release_date"
      :url="track?.external_urls?.spotify"
      :album="track?.album"
      :trackNumber="track?.track_number"
    />
    <TrackLyrics
      v-if="track"
      :lyrics="lyrics"
      :name="track.name"
      :url="track?.preview_url"
      :uri="track?.uri"
    />
    <DownloadButton @click="download()" />
    <MoreInfo title="Songs on Album" v-if="album != null" class="dark">
      <swiper v-bind="swiperOptions">
        <swiper-slide v-for="(item, index) in album" :key="index">
          <ScrollerItem
            :name="item?.name"
            :followers="item.followers"
            :image="track?.album?.images?.[1]?.url"
            :active="item.id == track?.id"
            :artists="item.artists"
            route="track"
            params="id"
            :value="item?.id"
            :dark="true"
          />
        </swiper-slide>
      </swiper>
    </MoreInfo>
    <MoreInfo title="Recommendations" class="dark">
      <swiper v-bind="swiperOptions">
        <swiper-slide v-for="(item, index) in recommendations" :key="index">
          <ScrollerItem
            :name="item?.name"
            :image="item?.album?.images?.[1]?.url"
            :artists="item.artists"
            route="track"
            params="id"
            :value="item?.id"
            :dark="true"
          />
        </swiper-slide>
      </swiper>
    </MoreInfo>
  </AppLayout>
</template>

<style scoped></style>
