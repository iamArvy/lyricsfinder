<script setup lang="ts">
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
  <section style="background-color: black; color: white; padding: 1rem">
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
      <p style="width: 100%; overflow-x: scroll" class="section">
        {{ url }}
      </p>
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
  section {
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
