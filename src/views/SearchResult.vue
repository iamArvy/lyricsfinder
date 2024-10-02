<template>
  <AppLayout :loaded="loaded">
    <SecondarySection title="Songs" v-if="tracks">
      <ScrollerList>
        <ScrollerItem
          v-for="item in tracks"
          :key="item"
          :name="item.name"
          :artists="item.artists"
          :value="item.id"
          route="track"
          params="id"
          :image="item?.album?.images?.[1]?.url"
        />
      </ScrollerList>
    </SecondarySection>
    <SecondarySection title="Albums" v-if="albums">
      <ScrollerList>
        <ScrollerItem
          v-for="item in albums"
          :key="item"
          :name="item.name"
          :artists="item.artists"
          :image="item?.images?.[1]?.url"
          :value="item.id"
          route="album"
          params="id"
        />
      </ScrollerList>
    </SecondarySection>
    <SecondarySection title="Artists" v-if="artistsdata">
      <ScrollerList>
        <ScrollerItem
          v-for="(item, index) in artistsdata"
          :key="index"
          :name="item.name"
          :followers="item.followers"
          :image="item?.images?.[1]?.url"
          :value="item.id"
          route="artist"
          params="id"
        />
      </ScrollerList>
    </SecondarySection>
  </AppLayout>
</template>

<script setup lang="ts">
// @ts-ignore
import AppLayout from '@/components/AppLayout.vue'
// @ts-ignore
import ScrollerItem from '@/components/ScrollerItem.vue'
import ScrollerList from '@/components/ScrollerList.vue'
// @ts-ignore
import SecondarySection from '@/components/SecondarySection.vue'

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
onMounted(async () => {
  await spotify.search(itemId)
  tracks.value = spotify.trackresult || null
  artistsdata.value = spotify.artistresult || null
  albums.value = spotify.albumresult || null
  console.log(artistsdata.value)
  loaded.value = true
})
</script>

<style scoped>
section {
  font-family: poppins;
}
</style>
