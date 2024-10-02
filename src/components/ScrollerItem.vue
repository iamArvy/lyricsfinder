<script setup>
import ParameterRouting from './ParameterRouting.vue'
// import { Swiper, SwiperSlide } from 'swiper/vue'

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
  <!-- <swiper-slide> -->
  <!-- <article class="tracks"> -->
  <ParameterRouting
    :route="route"
    :params="params"
    :value="value"
    class="items tracks"
    :class="dark ? 'dark' : null"
  >
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
  </ParameterRouting>
  <!-- </article> -->
  <!-- </swiper-slide> -->
</template>
<style scoped>
figure {
  max-height: 80%;
  overflow: hidden;
}
figure img {
  width: 100%;
}
figcaption {
  padding: 1rem;
  max-height: 100px;
  overflow-y: scroll;
}
.items {
  display: flex;
  flex-direction: column;
  padding: 0 0 1rem 0;
  border: 0px solid black;
  width: 250px;
  height: 300px;
  max-height: 400px;
  overflow: hidden;
  border-radius: 29px;
  /* background: #ffffff; */
  box-shadow:
    8px 8px 16px #8c8c8c,
    -8px -8px 16px #ffffff;
  color: black;
}
.items:hover {
  background-color: rgb(245, 245, 245);
}
.dark .items:hover {
  background-color: rgb(245, 245, 245);
  color: black;
}
.dark {
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
</style>
