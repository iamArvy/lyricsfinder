<script setup>
import Header from './HeaderBar.vue'
import Footer from './FooterBar.vue'
import Loader from './LoadingScreen.vue'

// const loaded = false
defineProps({
  loaded: Boolean
})
</script>
<template>
  <div class="app-container">
    <Header />
    <main v-if="loaded">
      <slot />
    </main>
    <Loader v-else />
    <Footer />
  </div>
</template>
<style>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100svh;
}
:root {
  --header-height: 70px;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
section {
  max-width: 1280px;
  padding-left: 3rem;
  padding-right: 3rem;
}
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
main {
  margin-top: var(--header-height);
  flex: 1;
  /* min-height: 80vh; */
  max-width: 1280px;
}
* {
  font-family: Poppins;
}
</style>
