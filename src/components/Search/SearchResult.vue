<template>
  <section v-if="loaded">
    <HeaderBarLyrics />
    <main>
      <SearchTrack v-if="trackresult" />
      <SearchAlbum v-if="albumresult" />
      <SearchArtist v-if="artistresult" />
    </main>
    <FooterBar />
  </section>
  <div v-else class="loading">
    <i class="fa-solid fa-spinner fa-spin fa-2xl" style="color: #000000;"></i>
    </div>
</template>

<script>
import HeaderBarLyrics from '../HeaderBarLyrics.vue';
import SearchAlbum from './SearchAlbum.vue';
import SearchArtist from './SearchArtist.vue';
import SearchTrack from './SearchTrack.vue';
import FooterBar from '../FooterBar.vue';
import {mapGetters, mapState, mapActions} from 'vuex';

// const key = '1b069fa3f7msh544331a7c94559fp1edbbfjsn90e8501cc274'; //rapidarvy
// const key = 'f4487bb2c6msh22c9f47af6a89afp1fff00jsn02d41c155170'; //okeope
// const key = '073319e51emshf395f17a0ef0467p1a45a0jsn775ff17f94b1'; //okeseyi4  8th oct
// const key = '230c4f1224msh6e3c2515f3af347p114161jsn3bc39c14a7ff'; //okeseyi5 8th oct
// const key = '4ff6724b2cmsh3193382ea47888ap14607ajsn1bac6967fc4f'; //segun   
// const key = '08df6b65fbmsh465634976d711abp1e35adjsnaa49f0bdc7bd'; //iamarvy
// const key = '437bfd7c68msh4d167dbcd27dd99p1154b1jsn364697005719'; //hell 27th september

export default{
  name: 'SearchResult',
  components: {
    HeaderBarLyrics,
    SearchAlbum,
    SearchArtist,
    SearchTrack,
    FooterBar,
  },
  data() {
    return {
    };
  },
  mounted() {
    const itemId = this.$route.query.q;
    this.search(itemId)
  },
  computed:{
    ...mapGetters('spotify',['trackresult', 'artistresult', 'albumresult']),
    ...mapState('spotify',['loaded',])
  },
  methods: {
    ...mapActions('spotify', ['search']),
    
  },
};

</script>


<style scoped>
section{
  font-family: poppins;
}
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
main{
  margin: 3.5rem 0 0 0;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  min-height: 80vh;
}
</style>