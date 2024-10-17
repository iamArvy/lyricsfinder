<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { RouterView } from 'vue-router'
import { useLoadingStore } from './stores/loading'
// @ts-ignore
import HeaderSection from './partials/HeaderSection.vue'
import FooterSection from './partials/FooterSection.vue'
import MyLoader from './components/MyLoader.vue'

// Use the loading store
// Use the loading store
const loader = useLoadingStore()
const dialog = ref<HTMLDialogElement | null>(null) // Dialog reference

// Watch for changes in the store's loading state
watch(
  () => loader.loading,
  (newLoading) => {
    console.log('Loading state changed:', newLoading) // Debugging line
    if (newLoading) {
      document.body.style.overflow = 'hidden'
      dialog.value?.showModal()
    } else {
      document.body.style.overflow = 'auto' // Change to 'auto' for normal scrolling
      setTimeout(() => {
        dialog.value?.close()
      }, 200)
    }
  }
)

// Optional: Manage the dialog on component mount if necessary
onMounted(() => {
  if (loader.loading) {
    document.body.style.overflow = 'hidden'
    dialog.value?.showModal()
  }
})
</script>

<template>
  <dialog ref="dialog">
    <div class="dialogcontent">
      <MyLoader />
    </div>
  </dialog>
  <header class="full-width">
    <HeaderSection />
  </header>
  <main>
    <RouterView />
  </main>
  <footer class="full-width">
    <FooterSection />
  </footer>
  <!-- <div class="loading" v-show="loading">
    <MyLoader />
  </div> -->
</template>

<style>
/* @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
.det::-webkit-scrollbar,
.section::-webkit-scrollbar {
  display: none;
} */
:root {
  --gradient: linear-gradient(to left, #0000ff, #00ffff);
  --primary: #101357;
  --secondary: #fbaf08;
  --heading: #101357;
  --subheading: #00ff00;
  --headerbg: #101357;
  --discount: rgba(255, 51, 51);
  --discount-bg: rgba(255, 51, 51, 0.1);
  --lighter-black: rgba(0, 0, 0, 0.4);
  --stars: #ffc633;
  --grey: #f0f0f0;
  --light-black: rgba(0, 0, 0, 0.6);
  --black: rgba(0, 0, 0);
  --buttonbg: #fbaf08;
  --bodybg: #fffff0;
  --herotext: #ffbf00;
  --headerheight: 60px;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Poppins, sans-serif;
}
#app {
  font-family: 'poppins';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  /* text-align: center;
  /* color: #2c3e50; */
}
main {
  background-color: var(--bodybg);
  color: var(--bodytext);
  /* height: 100vh; */
}
main,
.full-width {
  --padding-inline: 30px;
  --content-max-width: 1280px;
  /* display: flex; */
  /* flex-direction: column; */
  /* overflow-y: auto; */
  display: grid;
  grid-template-columns:
    [full-width-start] minmax(var(--padding-inline), 1fr) [content-start] min(
      100% - (var(--padding-inline) * 2),
      var(--content-max-width)
    )
    [content-end] minmax(var(--padding-inline), 1fr) [full-width-end];
  /* grid-template-rows: repeat(1fr) ; */
  /* row-gap: 2rem; */
}
main > *:not(.full-width),
.full-width > *:not(.full-width) {
  grid-column: content;
}
main > .full-width {
  grid-column: full-width;
  /* display: grid; */
}
main {
  position: relative;
  margin-top: var(--headerheight);
}
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: Poppins, sans-serif;
}
header {
  position: fixed;
  top: 0;
  width: 100%;
  height: var(--headerheight);
  z-index: 99; /* Ensure the header is above other elements */
}
main {
  flex: 1;
}
footer,
header {
  background-color: black;
  color: white;
}
/* .section {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.artimg {
  max-height: 300px;
  min-height: 300px;
} */

a {
  text-decoration: none;
}
li {
  list-style: none;
}
.dialogcontent {
  position: fixed;
  inset: 0;
  top: 0;
  /* z-index: 99999; */
  background: white;
  display: flex; /* Enables Flexbox layout */
  justify-content: center; /* Centers items horizontally */
  align-items: center;
}
/* h2 {
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
} */
</style>
