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
          :key="item"
          :artists="item?.artist_names"
          :title="item?.name"
          :number="index + 1"
          route="track"
          params="id"
          :value="item?.id"
        />
      </VerticalLister>
    </MainSection>
  </AppLayout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useSpotifyStore } from '@/stores/spotify'
import PageHero from '@/components/PageHero.vue'
import AppLayout from '@/components/AppLayout.vue'
import MainSection from '@/components/MainSection.vue'
import ListItem from '@/components/ListItem.vue'
import VerticalLister from '@/components/VerticalLister.vue'
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
  artists?: any[]
} | null>(null)
const loaded = ref(false)

// Get route parameters
const route = useRoute()
const itemId = route.query.id as string

onMounted(async () => {
  try {
    // Fetch album data
    await spotify.albums(itemId)

    // Update album reference with data from Spotify store
    album.value = spotify.albumgetter || null
    tracks.value = spotify.albumgetter.tracks.items || null

    // Set loaded state to true after data is fetched
    loaded.value = true

    // Debug output
  } catch (error) {
    console.error('Error fetching album data:', error)
  }
})
</script>

<style>
.todown:hover {
  border-bottom: 2px solid black;
}
.albuminfos img {
  width: 300px;
  height: 300px;
}
a {
  text-decoration: none;
  color: black;
}
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.left {
  width: 15vw;
}
.songlyrics {
  text-align: center;
}
.tit {
  text-align: center;
}
.todown {
  color: black;
  padding: 0 1rem;
  font-weight: 400;
}
.about {
  background-color: black;
  color: white;
  padding: 2rem;
}
.about a {
  color: white;
}
.album-container {
  display: flex;
  flex-direction: row;
  gap: 2rem;
}
@media (max-width: 700px) {
  .Basicinfo {
    flex-direction: column;
    gap: 1rem;
  }
  .Basicinfo > div {
    flex-direction: column;
    gap: 1rem;
  }
  .left {
    width: unset;
  }
}
</style>
