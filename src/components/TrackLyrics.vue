<template>
  <section>
    <h4>{{ name }}</h4>
    <article class="songlyrics" v-for="lyric in lyrics" :key="lyric.id">
      <span v-if="lyric">{{ lyric.words }}</span>
      <h2 style="text-align: center" v-else>Lyrics for this song is currently unavailable</h2>
    </article>
    <div class="preview" align="center" style="margin-top: 20px">
      <h6>Audio Preview</h6>
      <audio :src="url" type="mp3" controls :alt="name"></audio>
    </div>
    <div class="spotify" align="center">
      <i class="fa-brands fa-spotify"></i>
      <a :href="uri">Open In Spotify</a>
    </div>
  </section>
</template>

<style scoped>
.todown:hover {
  border-bottom: 2px solid black;
}
section {
  background-color: rgb(245, 245, 245);
  padding: 1rem;
  text-align: center;
}
article {
  display: flex;
  width: 100%;
  place-items: center;
  text-align: center;
}
.song a {
  text-decoration: none;
  color: black;
}
article span {
  text-align: center;
  width: 100%;
}
</style>

<script setup>
defineProps({
  lyrics: Array,
  track: Object,
  name: String,
  uri: String,
  url: String
})
</script>
