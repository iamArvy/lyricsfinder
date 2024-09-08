<script setup lang="ts">
defineProps({
  title: String
})
</script>
<template>
  <section>
    <h1>{{ title }}</h1>
    <slot />
  </section>
</template>
