<script setup>
defineProps({
  title: String
})
</script>
<template>
  <section>
    <h2>{{ title }}</h2>
    <slot />
  </section>
</template>
<style scoped>
section {
  padding-top: 2rem;
  padding-bottom: 2rem;
}
</style>
