import './assets/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
import AOS from 'aos'
import 'aos/dist/aos.css' // Import AOS styles

createApp({
  mounted() {
    AOS.init()
  }
  // ...
})
AOS.init({
  duration: 800, // Animation duration (in ms)
  easing: 'ease-in', // Animation easing
  offset: 350, // Offset (in px) from the element's top before triggering animation
  delay: 150, // Delay (in ms) before animation starts
  once: true // Whether to only animate elements once
})
