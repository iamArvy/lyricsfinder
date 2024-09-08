<script setup>
defineProps({
  route: String,
  params: String,
  value: String
})
</script>
<template>
  <Router-link :to="'/' + route + '?' + params + '=' + value"> <slot /> </Router-link>
</template>
