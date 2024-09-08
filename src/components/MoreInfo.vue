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
}
h1 {
  color: white;
}
</style>
