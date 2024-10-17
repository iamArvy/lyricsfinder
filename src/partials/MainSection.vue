<script setup lang="ts">
// No specific logic needed here for now
</script>
<template>
  <section>
    <h2><slot name="header" /></h2>
    <slot class="content" />
  </section>
</template>
<style scoped>
section {
  margin: 1rem 0 1rem 0;
  min-width: 100%;
}
h2 {
  margin: 1rem;
}
.content {
  margin: 1rem 0;
}
</style>
