import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: { title: 'Home Page' }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/TrackPage.vue'),
      meta: { title: 'Track Page' }
    },
    {
      path: '/artist',
      name: 'artist',
      component: () => import('../views/ArtistPage.vue'),
      meta: { title: 'Artist Page' }
    },
    {
      path: '/album',
      name: 'album',
      component: () => import('../views/AlbumPage.vue'),
      meta: { title: 'Album Page' }
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/SearchResult.vue'),
      meta: { title: 'Search Page' }
    },
    {
      path: '/track',
      name: 'track',
      component: () => import('../views/TrackPage.vue'),
      meta: { title: 'Track Page' }
    }
  ]
})
router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})
export default router
