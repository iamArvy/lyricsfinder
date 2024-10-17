<script setup lang="ts">
defineProps<{
  src?: string | undefined
  rounded?: boolean | undefined
}>()
</script>
<template>
  <figure :class="rounded ? 'rounded' : null">
    <img :src="src" alt="Image Not Found" />
  </figure>
</template>

<style scoped>
.rounded {
  border-radius: 50%;
}
figure {
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
img {
  height: 100%;
  width: 100%;
}
</style>
