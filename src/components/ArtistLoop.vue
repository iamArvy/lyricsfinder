<script setup lang="ts">
defineProps<{
  artists: {
    name: string
    id: string
  }[]
}>()
</script>
<template>
  <span v-for="(artist, index) in artists" :key="index">
    <ParameterRouting :value="artist.id" params="id" route="artist" class="link">{{
      artist.name
    }}</ParameterRouting>
    <span v-if="index < artists.length - 1">, </span>
  </span>
</template>
