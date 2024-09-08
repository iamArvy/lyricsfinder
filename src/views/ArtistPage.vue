<template>
  <AppLayout :loaded="loaded">
    <PageHero
      v-if="artist != null"
      :name="artist?.name"
      :image="artist?.images[1]?.url"
      :followers="artist.followers.total"
      :genre="artist.genre"
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
      <ScrollerList>
        <ScrollerItem
          v-for="item in topartists"
          :key="item"
          :name="item?.name"
          :followers="item.followers.total"
          :image="item?.images[1]?.url"
          route="track"
          params="id"
          :value="item?.id"
        />
      </ScrollerList>
    </MoreInfo>
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
import MoreInfo from '@/components/MoreInfo.vue'
import ScrollerItem from '@/components/ScrollerItem.vue'
import ScrollerList from '@/components/ScrollerList.vue'
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
const loaded = ref(false)

// Get route parameters
const route = useRoute()
const itemId = route.query.id as string

onMounted(async () => {
  try {
    // Fetch album data
    await spotify.artist(itemId)

    // Update album reference with data from Spotify store
    artist.value = spotify.artistgetter || null
    albums.value = spotify.artistalbumgetter || null
    topartists.value = spotify.artisttopgetter || null

    // Set loaded state to true after data is fetched
    loaded.value = true

    // Debug output
  } catch (error) {
    console.error('Error fetching album data:', error)
  }
})
</script>

<style scoped>
.pad {
  padding: 2rem;
}
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
.Basicinfo {
  display: flex;
  flex-direction: row;
}
.topbasic {
  margin-top: 3rem;
  gap: 10rem;
}
.Basicinfo > div {
  display: flex;
  flex-direction: row;
  gap: 5rem;
}
.left {
  width: 15vw;
}
.songlyrics {
  text-align: center;
}
.main {
  background-color: rgb(245, 245, 245);
  padding: 1rem;
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
