<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useGeniusStore } from '@/stores/genius'
import { useSpotifyStore } from '@/stores/spotify'
import { useLoadingStore } from '@/stores/loading'
// @ts-ignore
import ScrollerItem from '@/components/ScrollerItem.vue'
// @ts-ignore
import MainSection from '@/partials/MainSection.vue'
import ListItem from '@/components/ListItem.vue'
import Lister from '@/components/VerticalLister.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
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
const genius = useGeniusStore()
const spotify = useSpotifyStore()
const loader = useLoadingStore()
const chart = ref<
  | {
      item: {
        song_art_image_url: string
        artist_names: string
        title: string
      }
    }[]
  | null
>(null)
const newrelease = ref<
  | {
      img: string
      title: string
      description: string
      id: string
    }[]
  | null
>(null)
onMounted(async () => {
  try {
    await genius.getChart()
    await spotify.getNewRelease()
    newrelease.value = spotify.getnewrelease
      ? spotify.getnewrelease.map(
          (item: {
            name: string
            artists: { name: string }[]
            id: string
            images: { url: string }[]
          }) => ({
            title: item.name,
            description:
              item.artists.map((artist: { name: string }) => artist.name).join(', ') || null,
            id: item.id,
            img: item.images?.[0].url
          })
        )
      : null
    chart.value = genius.getchart || null
    loader.setLoading(false)
  } catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <MainSection>
    <template #header>New Releases</template>
    <swiper v-bind="swiperOptions">
      <swiper-slide v-for="(item, index) in newrelease" :key="index">
        <ScrollerItem :item="item" route="album" params="id" :value="item.id" />
      </swiper-slide>
    </swiper>
  </MainSection>
  <MainSection>
    <template #header>Genius Weekly Top Lyrics</template>
    <Lister>
      <ListItem
        v-for="(item, index) in chart"
        :key="index"
        :item="item"
        :image="item.item.song_art_image_url"
        :artists="item.item.artist_names"
        :title="item.item.title"
        :number="index + 1"
        route="search"
        params="q"
        :value="item.item.title + ' ' + item.item.artist_names"
      />
    </Lister>
  </MainSection>
</template>
