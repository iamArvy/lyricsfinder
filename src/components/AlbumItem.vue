<script setup lang="ts">
import { navigate } from '@/assets/navigate'
import ImgFigure from './ImgFigure.vue'
defineProps<{
  item: {
    title: string
    description: string | undefined
    id: string
    img?: string
  }
  route: string
  params: string
  dark?: boolean | false
  active?: boolean | false
}>()
</script>
<template>
  <article :class="dark ? 'dark' : null" @click="navigate(item.id, '', params)">
    <ImgFigure :src="item.img" class="img" />
    <figcaption>
      <h1>{{ item.title }}</h1>
      <p v-if="item.description">{{ item.description }}</p>
    </figcaption>
  </article>
</template>
<style scoped>
.img {
  width: 120px;
  height: 120px;
}
figcaption {
  padding: 1rem;
  max-height: 100px;
  overflow-y: scroll;
  text-align: center;
}
article {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  /* border: 0px solid black; */
  /* width: 250px; */
  /* height: 300px; */
  /* max-height: 400px; */
  cursor: pointer;
  color: black;
  background-color: transparent;
}
article:hover {
  background-color: rgb(245, 245, 245);
}
article.dark:hover {
  background-color: rgb(245, 245, 245);
  color: black;
}
article.dark {
  color: white;
}
p {
  font-size: 14px;
}
h1 {
  font-size: 16px;
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
