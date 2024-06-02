<template>
  <section v-if="loaded">
      <HeaderBarLyrics/>
      <TrackHero />
      <TrackLyrics />
      <TrackAbout />
      <FooterBar />
    </section>
    <div v-else class="loading">
      <i class="fa-solid fa-spinner fa-spin fa-2xl" style="color: #000000;"></i>
    </div>
  </template>
  

<script>
import HeaderBarLyrics from '../HeaderBarLyrics.vue';
import FooterBar from '../FooterBar.vue';
import {mapState, mapActions} from 'vuex';
import TrackHero from './TrackHero.vue';
import TrackLyrics from './TrackLyrics.vue';
import TrackAbout from './TrackAbout.vue';


// const key = '3a7b66b269msh1fff8b877f0d528p1be1b6jsn3b4b0f7f7a98'; //dokja
// const key = '1b069fa3f7msh544331a7c94559fp1edbbfjsn90e8501cc274'; //rapidarvy
// const key = '6587c92950mshb6db495dcf94461p181859jsna7747dcf34a2'; //Dokja51.0
// const dkey = '073319e51emshf395f17a0ef0467p1a45a0jsn775ff17f94b1'; //
// const key = 'f4487bb2c6msh22c9f47af6a89afp1fff00jsn02d41c155170'; //opeyemi
// const key = '073319e51emshf395f17a0ef0467p1a45a0jsn775ff17f94b1'; //okeseyi4
// const key = '230c4f1224msh6e3c2515f3af347p114161jsn3bc39c14a7ff'; //okeseyi5
// const key = '4ff6724b2cmsh3193382ea47888ap14607ajsn1bac6967fc4f'; //segun
// const key = '08df6b65fbmsh465634976d711abp1e35adjsnaa49f0bdc7bd'; //iamarvy
// const key = '437bfd7c68msh4d167dbcd27dd99p1154b1jsn364697005719'; //hell

export default{
  name: 'TrackPage',
  components: {
    HeaderBarLyrics,
    FooterBar,
    TrackHero,
    TrackLyrics,
    TrackAbout
  },
  data() {
    return {
    }
  },
  computed:{
    // ...mapGetters('spotify',['albumgetter', 'lyricsgetter', 'trackgetter', 'downloadgetter']),
    ...mapState('spotify',['loaded']),
  },
  created() {
    const itemId = this.$route.query.id;
    this.tracks(itemId)
  },
  methods: {
    ...mapActions('spotify',['tracks', 'downloader']),
  updateIdAndReload(newId) {
    const currentQuery = { ...this.$route.query };
    currentQuery.id = newId;
    const newURL = `${this.$router.resolve({ query: currentQuery }).href}`;
    window.location.href = newURL;
  },
  isIdMatch(id) {
    return id === this.$route.query.id;
  },

  download(){
      const itemId = this.$route.query.id;
    this.downloader(itemId)
  }
  },
};
</script>
  
<style>
.todown:hover{
  border-bottom: 2px solid black;
}
.albuminfos img{
  width: 300px;
  height: 300px;
}
a{
  text-decoration: none;
  color: black;

}
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.Basicinfo{
  display: flex;
  flex-direction: row;
}
.topbasic{
  margin-top: 3rem;
  gap: 10rem;
}
.Basicinfo>div{
  display: flex;
  flex-direction: row;
  gap: 5rem;
}
.left{
  width: 15vw;
}
.songlyrics{
  text-align: center;
  
}
.main{
  background-color: rgb(245, 245, 245);
  padding: 1rem;
}
.tit{
  text-align: center;
}
.todown{
  color: black;
  padding: 0 1rem;
  font-weight: 400;
}
.about{
  background-color: black;
  color: white;
  padding: 2rem;
}
.about a{
  color: white
}
.album-container{
  display: flex;
  flex-direction: row;
  gap: 2rem;
}
@media (max-width: 700px){
  .Basicinfo{
    flex-direction: column;
    gap: 1rem;
  }
  .Basicinfo>div{
    flex-direction: column;
    gap:1rem;
  }
  .left{
  width: unset;  
}
}
</style>
  
  