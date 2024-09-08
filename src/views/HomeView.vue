<template>
  <AppLayout :loaded="loaded">
    <MainSection title="New Releases">
      <ScrollerList>
        <ScrollerItem
          v-for="item in newrelease"
          :key="item"
          :image="item.images[2].url"
          :name="item.name"
          :artists="item.artists"
          route="album"
          params="id"
          :value="item.id"
        />
      </ScrollerList>
    </MainSection>
    <MainSection title="Genius Weekly Top Lyrics">
      <Lister>
        <ListItem
          v-for="(item, index) in chart"
          :key="item"
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
  </AppLayout>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useGeniusStore } from '@/stores/genius' // Adjust the path as necessary
import { useSpotifyStore } from '@/stores/spotify' // Adjust the path as necessary
import AppLayout from '@/components/AppLayout.vue'
import ScrollerList from '@/components/ScrollerList.vue'
import ScrollerItem from '@/components/ScrollerItem.vue'
import MainSection from '@/components/MainSection.vue'
import ListItem from '@/components/ListItem.vue'
import Lister from '@/components/VerticalLister.vue'
const genius = useGeniusStore()
const spotify = useSpotifyStore()
const loaded = ref(false)
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
      images: { url: string }[]
      name?: string
      artists?: { name: string }[]
      id: number
    }[]
  | null
>(null)
onMounted(async () => {
  try {
    await genius.getChart()
    await spotify.getNewRelease()
    newrelease.value = spotify.getnewrelease || null
    chart.value = genius.getchart || null
    loaded.value = true
  } catch (error) {
    console.error(error)
  }
})
</script>
