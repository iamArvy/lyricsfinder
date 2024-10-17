<script setup lang="ts">
// @ts-ignore
import ImgFigure from '@/components/ImgFigure.vue'
import ParameterRouting from './ParameterRouting.vue'
defineProps<{
  img: string
  //   name: String
  //   image: String
  //   artists: Array
  //   releaseDate: String
  //   url: String
  //   album: Object
  //   trackNumber: Number
  //   followers: Number
  //   genre: String
}>()
</script>
<template>
  <section style="background-color: black; color: white">
    <!-- <ImgFigure :src="img" class="img" /> -->
    <figure>
      <img :src="img" alt="" />
    </figure>
    <figcaption>
      <slot name="details" />
    </figcaption>
    <div class="flex">
      <slot name="others" />
    </div>
  </section>
</template>
<style scoped>
.flex {
  flex: 1;
}
.link {
  border-bottom: 2px solid white;
  color: white;
}
section {
  display: flex;
  flex-direction: row;
  gap: 5rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  background-color: black;
  width: 100%;
}
@media (max-width: 700px) {
  section {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
