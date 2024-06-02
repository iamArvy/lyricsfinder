<template>
    <section class="about" style="background-color: black; color: white;">
      <div>
        <h2>Songs on Album</h2>
        <div class="section">
          <div @click="navigateToAlbum(tracklist.id)" v-for="(tracklist, index) in albumgetter.tracks.items" :key="index" >
            <div class="tracks" :style="{
            backgroundColor: isIdMatch(tracklist.id).bcolor,
            color: isIdMatch(tracklist.id).color
            }">
                <img :src="albumgetter.images[1].url" :alt="albumgetter.name">
                <div class="det" >
                    <h6>{{ tracklist.name }}</h6>
                    <div>
                      <span>-<span v-for="(artist, index) in tracklist.artists" :key="index">
                              {{ artist.name }}<span v-if="index < tracklist.artists.length - 1">, </span>
                          </span>
                      </span>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2>Recommendations</h2>
        <div class="section">
          <div @click="navigateToAlbum(tracklist.id)"  v-for="(tracklist, index) in recommendationgetter" :key="index" >
            <div class="tracks" :style="{
            backgroundColor: isIdMatch(tracklist.id).bcolor,
            color: isIdMatch(tracklist.id).color
            }">
                <img :src="tracklist.album.images[1].url" :alt="albumgetter.name">
                <div class="det" >
                    <h6>{{ tracklist.name }}</h6>
                    <div>
                      <span>-<span v-for="(artist, index) in tracklist.artists" :key="index">
                              {{ artist.name }}<span v-if="index < tracklist.artists.length - 1">, </span>
                          </span>
                      </span>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
</template>

<style scoped>
.det::-webkit-scrollbar, .section::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}
.det{
    padding: 1rem;
    max-height: 100px;
    overflow: scroll;
    scrollbar-width: none;
  -ms-overflow-style: none;
}
.section{
    padding: 5px;
    display: flex;
    flex-direction: row;
    overflow: scroll;
    /* flex-wrap: wrap; */
    /* justify-content: space-evenly; */
    font-family: poppins;
    gap: 1rem;
    scrollbar-width: none;
  -ms-overflow-style: none;
  }
  .link{
    text-decoration: none;
    font-family: poppins;
    margin-bottom: 1rem;

  }
  .searcharea{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 1rem;
    margin: auto;
  }
  .tracks{
    display: flex;
    flex-direction: column;
    /* justify-content: space-between; */
    /* align-items: center; */
    padding: 0 0 1rem 0;
    border: 0px solid black;
    width: 300px;
    height: 400px;
    max-height: 400px;
    overflow: hidden;
    border-radius: 29px;
    background: black;
    border: 2px solid white;
    }
    /* .tracks:nth-child(odd){
      background-color: rgb(245, 245, 245);
  
    } */
    .tracks:hover{
      background-color: white;
      color: black;
    }
</style>

<script>
import {mapGetters} from 'vuex';

export default{
  computed:{
    ...mapGetters('spotify',['albumgetter', 'recommendationgetter']),
  },
  methods: {
    isIdMatch(id) {
    // return id === this.$route.query.id;
    if (id === this.$route.query.id){
      return {
          bcolor: 'white',
          color: 'black'
        };
    }
    else{
      return {
          bcolor: 'none',
          color: 'none'
        };
    }
  },
  navigateToAlbum(albumId) {
        const baseURL = '/track';
        const urlWithQuery = `${baseURL}?id=${albumId}`;
        window.location.href = urlWithQuery;
    }
  }
};
</script>