<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useSpotifyStore } from '@/stores/spotify'
import { useRapidStore } from '@/stores/rapid'
import AppLayout from '@/components/AppLayout.vue'
import PageHero from '@/components/PageHero.vue'
import TrackLyrics from '@/components/TrackLyrics.vue'
import MoreInfo from '@/components/MoreInfo.vue'
import ScrollerItem from '@/components/ScrollerItem.vue'
import ScrollerList from '@/components/ScrollerList.vue'
const spotify = useSpotifyStore()
const rapid = useRapidStore()
const route = useRoute()
const itemId = route.query.id as string
const loaded = ref(false)
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
</script>

<template>
  <AppLayout :loaded="loaded">
    <PageHero
      v-if="track != null"
      :name="track?.name"
      :image="track?.album?.images[1]?.url"
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
    <MoreInfo title="Songs on Album" v-if="album != null">
      <ScrollerList>
        <ScrollerItem
          v-for="item in album"
          :key="item"
          :name="item?.name"
          :followers="item.followers"
          :image="track?.album?.images[1]?.url"
          :isCurrent="item.id == track?.id"
          :artists="item.artists"
          route="track"
          params="id"
          :value="item?.id"
        />
      </ScrollerList>
    </MoreInfo>
    <MoreInfo title="Recommendations">
      <ScrollerList>
        <ScrollerItem
          v-for="(item, index) in recommendations"
          :key="index"
          :name="item?.name"
          :image="item?.album?.images[1].url"
          :artists="item.artists"
          route="track"
          params="id"
          :value="item?.id"
        />
      </ScrollerList>
    </MoreInfo>
  </AppLayout>
</template>

<style scoped>
/* Your styles here */
</style>
