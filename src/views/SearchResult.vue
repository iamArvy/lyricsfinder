<template>
  <AppLayout :loaded="loaded">
    <SecondarySection title="Songs" v-if="tracks">
      <ScrollerList>
        <ScrollerItem
          v-for="(item, index) in tracks"
          :key="index"
          @click="navigate(item.id, 'track')"
          :name="item.name"
          :artists="item.artists"
          :image="item.album.images[1].url"
        />
      </ScrollerList>
    </SecondarySection>
    <SecondarySection title="Albums" v-if="albums">
      <ScrollerList>
        <ScrollerItem
          v-for="(item, index) in albums"
          :key="index"
          @click="navigate(item.id, 'album')"
          :name="item.name"
          :artists="item.artists"
          :image="item.images[1].url"
        />
      </ScrollerList>
    </SecondarySection>
    <SecondarySection title="Songs" v-if="artists">
      <ScrollerList>
        <ScrollerItem
          v-for="(item, index) in artists"
          :key="index"
          @click="navigate(item.id, 'artist')"
          :name="item.name"
          :followers="item.followers"
          :image="item.images[1].url"
        />
      </ScrollerList>
    </SecondarySection>
  </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from '@/components/AppLayout.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
import { useSpotifyStore } from '@/stores/spotify'
import { computed, onMounted, ref } from 'vue'
const spotify = useSpotifyStore()
import { navigate } from '@/components/navigate'
// const loaded = computed(() => spotify.loaded)
const tracks = computed(() => spotify.trackresult)
const artists = computed(() => spotify.artistresult)
const albums = computed(() => spotify.albumresult)
import ScrollerItem from '@/components/ScrollerItem.vue'
import ScrollerList from '@/components/ScrollerList.vue'
import SecondarySection from '@/components/SecondarySection.vue'
// const key = '1b069fa3f7msh544331a7c94559fp1edbbfjsn90e8501cc274'; //rapidarvy
// const key = 'f4487bb2c6msh22c9f47af6a89afp1fff00jsn02d41c155170'; //okeope
// const key = '073319e51emshf395f17a0ef0467p1a45a0jsn775ff17f94b1'; //okeseyi4  8th oct
// const key = '230c4f1224msh6e3c2515f3af347p114161jsn3bc39c14a7ff'; //okeseyi5 8th oct
// const key = '4ff6724b2cmsh3193382ea47888ap14607ajsn1bac6967fc4f'; //segun
// const key = '08df6b65fbmsh465634976d711abp1e35adjsnaa49f0bdc7bd'; //iamarvy
// const key = '437bfd7c68msh4d167dbcd27dd99p1154b1jsn364697005719'; //hell 27th september
const itemId = route.query.q as string
const loaded = ref(false)
onMounted(() => {
  spotify.search(itemId)
  loaded.value = true
})
// const navigate = (value: Number, route: String): void => {
//   const baseURL = `/${route}`
//   const urlWithQuery = `${baseURL}?id=${value}`
//   window.location.href = urlWithQuery
// }
</script>

<style scoped>
section {
  font-family: poppins;
}
</style>
