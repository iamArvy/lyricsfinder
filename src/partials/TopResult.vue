<script setup lang="ts">
import ImgFigure from '@/components/ImgFigure.vue'
defineProps<{
  title: string | null
  description: string | null
  img: string
  artist: boolean | false
  download: {
    id: string
    type: string
  } | null
  audio: string
}>()
</script>
<template>
  <section>
    <ImgFigure :src="img" :rounded="artist" />
    <figcaption>
      <h1>{{ title }}</h1>
      <p>{{ description }}</p>
    </figcaption>
    <div class="buttons" v-if="!artist"><button>Play</button><button>Download</button></div>
  </section>
</template>
