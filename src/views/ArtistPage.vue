<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useSpotifyStore } from '@/stores/spotify'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import PageHero from '@/components/PageHero.vue'
// @ts-ignore

import MainSection from '@/components/MainSection.vue'
import ListItem from '@/components/ListItem.vue'
import VerticalLister from '@/components/VerticalLister.vue'
// @ts-ignore

import MoreInfo from '@/components/MoreInfo.vue'
// @ts-ignore

import ScrollerItem from '@/components/ScrollerItem.vue'
// @ts-ignore
import { useLoadingStore } from '@/stores/loading'
const loader = useLoadingStore()
const spotify = useSpotifyStore()
const artist = ref<{
  images: { url: string }[]
  name?: string
  followers: { total: number }
  genre: { genre: string }
  id?: string
} | null>(null)
const albums = ref<
  | {
      name?: string
      images?: { url: string }[]
      album_type?: string
    }[]
  | null
>(null)
const topartists = ref<
  { images: { url: string }[]; name?: string; followers: { total: string }; id?: string }[] | null
>(null)

// Get route parameters
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
    // Fetch album data
    await spotify.artist(itemId)

    // Update album reference with data from Spotify store
    artist.value = spotify.artistgetter || null
    albums.value = spotify.artistalbumgetter || null
    topartists.value = spotify.artisttopgetter || null

    loader.setLoading(false)

    // Debug output
  } catch (error) {
    console.error('Error fetching album data:', error)
  }
})
</script>

<template>
  <PageHero
    v-if="artist != null"
    :name="artist?.name"
    :image="artist?.images[1]?.url"
    :followers="artist.followers.total"
    :genre="artist?.genre"
    :popularity="artist.popularity"
  />
  <MainSection title="Tracklist:">
    <VerticalLister>
      <ListItem
        v-for="(item, index) in albums"
        :key="item"
        :image="item?.images[1]?.url"
        :artists="item?.album_type"
        :title="item?.name"
        route="album"
        params="id"
        :value="item?.id"
      />
    </VerticalLister>
  </MainSection>
  <MoreInfo title="Related Artists" v-if="topartists != null">
    <swiper v-bind="swiperOptions">
      <swiper-slide v-for="item in topartists" :key="item">
        <ScrollerItem
          :name="item?.name"
          :followers="item.followers.total"
          :image="item?.images[1]?.url"
          route="track"
          params="id"
          :value="item?.id"
          :dark="true"
        />
      </swiper-slide>
    </swiper>
  </MoreInfo>
</template>
