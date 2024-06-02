<template>
    <div v-if="loaded">
      <HeaderBarLyrics />
      <div class="sections">
        <NewRealeases />
        <SongChart />
      </div>
      <FooterBar />
    </div>
    <div v-else class="loading">
        <i class="fa-solid fa-spinner fa-spin fa-2xl" style="color: #000000;"></i>
    </div>
    
  </template>
  
  <style scoped>
    .sections{
      padding: 5rem 5rem 0 5rem;
      display: flex;
      flex-direction: column;
      gap: 3rem;
    }
    @media (max-width: 700px) {
      .sections{
        padding: 1rem;
      }
    }
  </style>
  <script>
  import HeaderBarLyrics from '../HeaderBarLyrics.vue';
  import FooterBar from '../FooterBar.vue';
  import NewRealeases from './NewRealeases.vue';
  import SongChart from './SongChart.vue';
  import {mapState, mapActions} from 'vuex'
  
  
  export default{
    name: 'LandingPage',
  
    components: {
      HeaderBarLyrics,
      FooterBar,
      NewRealeases,
      SongChart
    },
    computed:{
      ...mapState('spotify',['loaded']),
    },
    methods: {
      ...mapActions('spotify',['landing']),
      // ...mapActions('details',['charts']),
      submitForm() {
      this.$router.push({
      name: "SearchResult",
      query: { q: this.query }
  });
    },
    },
    created() {
    this.landing()
    // this.getNewalbum()
  },
  };
  </script>
  
  
  