<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useSpotifyStore } from '@/stores/spotify'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import PageHero from '@/components/PageHero.vue'
// @ts-ignore

import AppLayout from '@/components/AppLayout.vue'
import MainSection from '@/components/MainSection.vue'
import ListItem from '@/components/ListItem.vue'
import VerticalLister from '@/components/VerticalLister.vue'
// @ts-ignore

import MoreInfo from '@/components/MoreInfo.vue'
// @ts-ignore

import ScrollerItem from '@/components/ScrollerItem.vue'
// @ts-ignore

import DownloadButton from '@/components/DownloadButton.vue'
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
const spotify = useSpotifyStore()
const album = ref<{
  images: { url: string }[]
  name?: string
  artists?: any[]
  release_date?: string
  external_urls?: { spotify: string }
} | null>(null)

const tracks = ref<{
  name?: string
  artists?: { artist_names?: string }[]
} | null>(null)

const newrelease = ref<
  | {
      images: { url: string }[]
      name?: string
      artists?: { name: string }[]
      id: number
    }[]
  | null
>(null)

const loaded = ref(false)

const route = useRoute()
const itemId = route.query.id as string

onMounted(async () => {
  try {
    await spotify.albums(itemId)
    await spotify.getNewRelease()
    album.value = spotify.albumgetter || null
    tracks.value = spotify.albumgetter.tracks.items || null
    newrelease.value = spotify.getnewrelease || null
    loaded.value = true
  } catch (error) {
    console.error('Error fetching album data:', error)
  }
})

const params = {
  pathname: 'downloadAlbum',
  params: [{ name: 'albumId', value: itemId }]
}
</script>

<template>
  <AppLayout :loaded="loaded">
    <PageHero
      v-if="album != null"
      :name="album?.name"
      :image="album?.images[1]?.url"
      :artists="album?.artists"
      :releaseDate="album?.release_date"
      :url="album?.external_urls?.spotify"
    />

    <MainSection title="Tracklist:">
      <VerticalLister>
        <ListItem
          v-for="(item, index) in tracks"
          :key="index"
          :artists="item?.artists?.artist_names"
          :title="item?.name"
          :number="index + 1"
          route="track"
          params="id"
          :value="item?.id"
        />
      </VerticalLister>
    </MainSection>
    <DownloadButton :params="params" />
    <MoreInfo title="New Releases" v-if="album != null" class="dark">
      <swiper v-bind="swiperOptions">
        <swiper-slide v-for="item in newrelease" :key="item">
          <ScrollerItem
            :image="item.images[2].url"
            :name="item.name"
            :artists="item.artists"
            route="album"
            params="id"
            :value="item.id"
            :dark="true"
          />
        </swiper-slide>
      </swiper>
    </MoreInfo>
  </AppLayout>
</template>
