<script setup>
import Header from './HeaderBar.vue'
import Footer from './FooterBar.vue'
import Loader from './LoadingScreen.vue'
defineProps({
  loaded: Boolean
})
</script>
<template>
  <Header />
  <main>
    <slot />
  </main>
  <!-- <Loader v-else /> -->
  <Footer />
</template>
<!-- <template v-else class="loading">
</template> -->
<style scoped>
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
  margin-top: 3.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  min-height: 80vh;
}
* {
  font-family: Poppins;
}
</style>
