<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import { ref } from 'vue'
import ScrollerItem from '@/components/ScrollerItem.vue'
defineProps<{
  items: {
    title: string
    id: string
    img: string
    description: string
  }[]
}>()
const swiperOptions = ref({
  // spaceBetween: 50,
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  breakpoints: {
    1100: {
      slidesPerView: 5,
      spaceBetween: 30
    },
    881: {
      slidesPerView: 3,
      spaceBetween: 10
    },
    851: {
      slidesPerView: 2,
      spaceBetween: 10
    },
    501: {
      slidesPerView: 2,
      spaceBetween: 1
    }
  }
})
</script>
<template>
  <swiper v-bind="swiperOptions">
    <swiper-slide v-for="(item, index) in items" :key="index">
      <ScrollerItem :item="item" route="artist" params="id" rounded />
    </swiper-slide>
  </swiper>
</template>
