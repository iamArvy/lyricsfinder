<script setup>
import { RouterLink } from 'vue-router'
import SearchBar from '@/components/SearchBar.vue'
</script>

<template>
  <section>
    <RouterLink to="/" class="logo">
      <img src="../assets/logo.png" alt="" style="width: 30px" />
      <span>LyricsFinder</span>
    </RouterLink>
    <SearchBar />
  </section>
</template>

<style scoped>
section {
  height: 100%;
  display: flex;
  flex-direction: row;
  place-items: center;
  justify-content: space-between;
}
.logo {
  cursor: pointer;
  color: white;
}
.logo {
  display: flex;
  flex-direction: row;
  gap: 5px;
}
.home {
  text-decoration: none;
  color: white;
}
.home:hover {
  color: white;
}
</style>
