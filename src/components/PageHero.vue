<script setup lang="ts">
// @ts-ignore
import ParameterRouting from './ParameterRouting.vue'
defineProps({
  name: String,
  image: String,
  artists: Array,
  releaseDate: String,
  url: String,
  album: Object,
  trackNumber: Number,
  followers: Number,
  genre: String
})
</script>
<template>
  <section style="background-color: black; color: white">
    <!-- <div class="right"> -->
    <figure>
      <img :src="image" :alt="name" />
    </figure>
    <figcaption>
      <h2>{{ name }}</h2>
      <h4>
        <span v-for="(artist, index) in artists" :key="index">
          <ParameterRouting :value="artist.id" params="id" route="artist" class="link">{{
            artist.name
          }}</ParameterRouting>
          <span v-if="index < artists.length - 1">, </span>
        </span>
        <span v-if="followers">{{ followers }} followers</span>
      </h4>
      <h4>
        <span v-for="item in genre" :key="item">
          <span>{{ item }}</span>
          <span v-if="index < artists.length - 1">, </span>
        </span>
      </h4>
      <div v-if="album && album.album_type !== 'single'">
        <ParameterRouting
          :value="album.id"
          params="id"
          route="album"
          class="link"
          style="text-transform: capitalize"
        >
          {{ album.name }} - {{ album.album_type }}
        </ParameterRouting>
        <h5>Track {{ trackNumber }} of {{ album.total_tracks }}</h5>
      </div>
      <h5>{{ releaseDate }}</h5>
      <!-- <p style="width: 100%; overflow-x: scroll" class="section">
        {{ url }}
      </p> -->
    </figcaption>
    <!-- </div> -->
  </section>
</template>
<style scoped>
.link {
  border-bottom: 2px solid white;
  color: white;
}
section {
  display: flex;
  flex-direction: row;
  gap: 3rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  background-color: black;
}
@media (max-width: 700px) {
  section {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
