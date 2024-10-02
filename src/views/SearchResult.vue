<script setup lang="ts">
// @ts-ignore
import AppLayout from '@/components/AppLayout.vue'
// @ts-ignore
import ScrollerItem from '@/components/ScrollerItem.vue'
// @ts-ignore
import SecondarySection from '@/components/SecondarySection.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import { useRoute } from 'vue-router'
const route = useRoute()
import { useSpotifyStore } from '@/stores/spotify'
import { onMounted, ref } from 'vue'
const spotify = useSpotifyStore()
const tracks = ref<
  | {
      album?: { images?: { url?: string }[] }
      name?: string
      id?: number
      artists?: { name: string }[]
    }[]
  | null
>(null)
const artistsdata = ref<
  | {
      images?: { url?: string }[]
      followers?: string
      name?: string
      id?: number
      artists?: { name: string }[]
    }[]
  | null
>(null)
const albums = ref<
  | {
      images?: { url?: string }[]
      name?: string
      id?: number
      artists?: { name: string }[]
    }[]
  | null
>(null)
const itemId = route.query.q as string
const loaded = ref(false)
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
  await spotify.search(itemId)
  tracks.value = spotify.trackresult || null
  artistsdata.value = spotify.artistresult || null
  albums.value = spotify.albumresult || null
  console.log(artistsdata.value)
  loaded.value = true
})
</script>

<template>
  <AppLayout :loaded="loaded">
    <SecondarySection title="Songs" v-if="tracks">
      <swiper v-bind="swiperOptions">
        <swiper-slide v-for="(item, index) in tracks" :key="index">
          <ScrollerItem
            :name="item.name"
            :artists="item.artists"
            :value="item.id"
            route="track"
            params="id"
            :image="item?.album?.images?.[1]?.url"
          />
        </swiper-slide>
      </swiper>
    </SecondarySection>
    <SecondarySection title="Albums" v-if="albums">
      <swiper v-bind="swiperOptions">
        <swiper-slide v-for="(item, index) in albums" :key="index"
          ><ScrollerItem
            :name="item.name"
            :artists="item.artists"
            :image="item?.images?.[1]?.url"
            :value="item.id"
            route="album"
            params="id"
        /></swiper-slide>
      </swiper>
    </SecondarySection>
    <SecondarySection title="Artists" v-if="artistsdata">
      <swiper v-bind="swiperOptions">
        <swiper-slide v-for="(item, index) in artistsdata" :key="index"
          ><ScrollerItem
            :name="item.name"
            :followers="item.followers"
            :image="item?.images?.[1]?.url"
            :value="item.id"
            route="artist"
            params="id"
        /></swiper-slide>
      </swiper>
    </SecondarySection>
  </AppLayout>
</template>

<style scoped>
section {
  font-family: poppins;
}
</style>
