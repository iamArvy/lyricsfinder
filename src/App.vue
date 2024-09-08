<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
.det::-webkit-scrollbar,
.section::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}
.section {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.artimg {
  max-height: 300px;
  min-height: 300px;
}
#app {
  font-family: 'poppins';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center;
  /* color: #2c3e50; */
}
html,
body {
  height: 100%;
  margin: 0;
}
h2 {
  font-size: calc(1.325rem + 0.9vw);
}
h6,
.h6,
h5,
.h5,
h4,
.h4,
h3,
.h3,
h2,
.h2,
h1,
.h1 {
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-weight: 500;
  line-height: 1.2;
}
h4 {
  font-size: calc(1.275rem + 0.3vw);
}
h5 {
  font-size: 1.25rem;
}
h6 {
  font-size: 1rem;
}
</style>
