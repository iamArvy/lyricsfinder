<script setup>
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
<style scoped>
section {
  background-color: black;
  padding-top: 1rem;
  padding-bottom: 1rem;
}
h1 {
  color: white;
}
</style>
