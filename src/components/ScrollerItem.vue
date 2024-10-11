<script setup>
import { navigate } from '../assets/navigate'
defineProps({
  name: String,
  followers: Number,
  artists: Array,
  image: String,
  route: String,
  params: String,
  value: String,
  dark: {
    type: Boolean,
    default: false
  },
  active: {
    type: Boolean,
    default: false
  }
})
</script>
<template>
  <article :class="dark ? 'dark' : null" @click="navigate(value, route, params)">
    <figure>
      <img class="artimg" v-if="image" :src="image" alt="Image" />
    </figure>
    <figcaption>
      <h6>{{ name }}</h6>
      <p v-if="followers">- {{ followers.total }} followers</p>
      <p v-if="artists">
        -<span v-for="(artist, index) in artists" :key="index">
          {{ artist.name }}<span v-if="index < artists.length - 1">, </span>
        </span>
      </p>
    </figcaption>
  </article>
</template>
<style scoped>
figure {
  max-height: 80%;
  width: 100%;
  overflow: hidden;
  display: flex;
  /* place-content: center; */
  justify-content: center;
  align-items: center;
}
figure img {
  width: 100%;
}
figcaption {
  padding: 1rem;
  max-height: 100px;
  overflow-y: scroll;
}
article {
  display: flex;
  flex-direction: column;
  padding: 0 0 1rem 0;
  border: 0px solid black;
  width: 250px;
  height: 300px;
  max-height: 400px;
  overflow: hidden;
  border-radius: 29px;
  cursor: pointer;
  box-shadow:
    8px 8px 16px #8c8c8c,
    -8px -8px 16px #ffffff;
  color: black;
}
article:hover {
  background-color: rgb(245, 245, 245);
}
article.dark:hover {
  background-color: rgb(245, 245, 245);
  color: black;
}
article.dark {
  background-color: transparent;
  border: 2px solid white;
  box-shadow: none;
  color: white;
}
p {
  font-size: 12px;
}
h6 {
  font-size: 14px;
}
@media screen and (max-width: 879px) {
  article {
    width: 300px;
    height: 350px;
  }
}
@media screen and (max-width: 750px) {
  article {
    width: 250px;
    height: 300px;
  }
}
@media screen and (max-width: 650px) {
  article {
    width: 200px;
    height: 250px;
  }
}
@media screen and (max-width: 500px) {
  article {
    width: 300px;
    height: 350px;
  }
}
</style>
