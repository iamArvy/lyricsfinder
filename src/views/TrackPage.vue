<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useSpotifyStore } from '@/stores/spotify'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import { useDownloadStore } from '@/stores/download'
// @ts-ignore

import PageHero from '@/components/PageHero.vue'
// @ts-ignore

// import TrackLyrics from '@/components/TrackLyrics.vue'
// @ts-ignore

import MoreInfo from '@/components/MoreInfo.vue'
// @ts-ignore

import ScrollerItem from '@/components/ScrollerItem.vue'
// @ts-ignore

import DialogModal from '@/components/DialogModal.vue'
import MyLoader from '@/components/MyLoader.vue'
import DownloadButton from '@/components/DownloadButton.vue'
import { useLoadingStore } from '@/stores/loading'
const loader = useLoadingStore()
const spotify = useSpotifyStore()
const downloader = useDownloadStore()
const route = useRoute()
const itemId = route.query.id as string
const swiperOptions = ref({
  spaceBetween: 50,
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  breakpoints: {
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
    track.value = spotify.trackgetter || null
    album.value = spotify.albumgetter.tracks.items || null
    recommendations.value = spotify.recommendationgetter || null
    loader.setLoading(false)
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
const download = async () => {
  try {
    // loading.value = true
    openModal.value = true
    await downloader.download(itemId, 'audio')
    // loading.value = false
  } catch (error) {
    console.error(error)
  }
}
const closeModal = () => {
  openModal.value = false
}
</script>

<template>
  <DialogModal :show="openModal" :close="closeModal" :title="track?.name">
    <MyLoader v-if="loading" />
    <span v-else>{{ downloader.$state.downloadProgress }}</span>
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
</template>

<style scoped></style>
