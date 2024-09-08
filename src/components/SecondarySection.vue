<script setup>
defineProps({
  title: String
})
</script>
<template>
  <section>
    <h3>{{ title }}</h3>
    <slot />
  </section>
</template>
<style scoped>
h3 {
  text-align: center;
  text-decoration: underline;
}
</style>
