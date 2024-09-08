<script setup>
import ParameterRouting from './ParameterRouting.vue'
defineProps({
  name: String,
  followers: Number,
  artists: Array,
  image: String,
  route: String,
  params: String,
  value: String
})
</script>
<template>
  <li>
    <!-- <article class="tracks"> -->
    <ParameterRouting :route="route" :params="params" :value="value" class="items tracks">
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
  </li>
</template>
<style scoped>
figcaption {
  padding: 1rem;
  max-height: 100px;
  overflow-y: scroll;
  color: black;
}
.items {
  display: flex;
  flex-direction: column;
  padding: 0 0 1rem 0;
  border: 0px solid black;
  width: 300px;
  height: 400px;
  max-height: 400px;
  overflow: hidden;
  border-radius: 29px;
  background: #ffffff;
  box-shadow:
    8px 8px 16px #8c8c8c,
    -8px -8px 16px #ffffff;
}
.items:hover {
  background-color: rgb(245, 245, 245);
}
.dark .items:hover {
  background-color: rgb(245, 245, 245);
}
.dark .items {
  background-color: transparent;
}
</style>
