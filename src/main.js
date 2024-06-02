import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import './assets/style.css'
import App from './App.vue';
import routes from './routes';
import { createStore } from 'vuex';
import spotify from './spotify'


const store = createStore({
  modules: {
    spotify
  }
});
const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

createApp(App)
  .use(router)
  .use(store)
  .mount('#app');

  import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles

createApp({
    mounted() {
      AOS.init();
    },
    // ...
  });
  AOS.init({
    duration: 800, // Animation duration (in ms)
    easing: 'ease-in', // Animation easing
    offset: 350, // Offset (in px) from the element's top before triggering animation
    delay: 150, // Delay (in ms) before animation starts
    once: true // Whether to only animate elements once
  });

