<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
// Page Components
import DialogModal from '@/components/DialogModal.vue'
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
import { useSpotifyStore } from '@/stores/spotify' // Spotify Store
import { Swiper, SwiperSlide } from 'swiper/vue' // Swiper
import 'swiper/css'
import { useDownloadStore } from '@/stores/download'

// import DownloadLoader from '@/components/DownloadLoader.vue'
// Variables
const spotify = useSpotifyStore()
const downloader = useDownloadStore()

const album = ref<{
  images: { url: string }[]
  name?: string
  artists?: any[]
  release_date?: string
  external_urls?: { spotify: string }
} | null>(null)

const tracks = ref<
  | {
      name?: string
      id: string
    }[]
  | null
>(null)

const newrelease = ref<
  | {
      images: { url: string }[]
      name?: string
      artists?: { name: string }[]
      id: number
    }[]
  | null
>(null)

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
const openModal = ref(false)
const loading = ref<boolean>(false)
// const restart = ref<boolean>(true)
const download = async () => {
  try {
    // loading.value = true
    openModal.value = true
    await downloader.download(itemId, 'album')
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
  <AppLayout :loaded="loaded">
    <DialogModal :show="openModal" :close="closeModal" :title="album?.name">
      <MyLoader v-if="loading" />
      <div v-else>
        <div>
          <span>{{ downloader.$state.downloadProgress }}</span>
        </div>
        <!-- <div><DownloadLoader /></div> -->
      </div>
    </DialogModal>
    <PageHero
      v-if="album != null"
      :name="album?.name"
      :image="album?.images[1]?.url"
      :artists="album?.artists"
      :releaseDate="album?.release_date"
    />

    <MainSection title="Tracklist:">
      <VerticalLister>
        <ListItem
          v-for="(item, index) in tracks"
          :key="index"
          :title="item?.name"
          :number="index + 1"
          route="track"
          params="id"
          :value="item?.id"
        />
      </VerticalLister>
    </MainSection>
    <DownloadButton @click="download" />
    <MoreInfo title="New Releases" v-if="album != null" class="dark">
      <swiper v-bind="swiperOptions">
        <swiper-slide v-for="(item, index) in newrelease" :key="index">
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
