<template>
    <section class="about" style="background-color: black; color: white;">
        <div class="artcont">
            <h2>Related Artists:</h2>
            <section class="section">
                <div @click="navigateToArtist(artist.id)" v-for="(artist, index) in artisttopgetter" :key="index">
        <div class="tracks">
          <img class="artimg" v-if="artist.images && artist.images.length > 1" :src="artist.images[1].url" alt="Second Image" />
          <div class="det">
              <h6>{{ artist.name }}</h6>
              <div>
              <span> -{{ artist.followers.total }} followers</span>
              </div>
          </div>
        </div>
      </div>
            </section>
        </div>
    </section>
</template>

<style scoped>
.about{
    padding: 2rem;
}
.artimg{
    max-height: 300px;
}
.artcont{
    margin-bottom: 2rem;
}
.det{
  padding: 1rem;
  max-height: 100px;
  min-height: 84px;
  overflow: scroll;
}
.section{
  padding: 5px;
  display: flex;
  flex-direction: row;
  overflow: scroll;
  /* flex-wrap: wrap; */
  /* justify-content: space-evenly; */
  font-family: poppins;
  gap: 1rem
}
.link{
  text-decoration: none;
  /* color: black; */
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
  border: 2px solid white;
  width: 300px;
  height: 400px;
  max-height: 400px;
  overflow: hidden;
  border-radius: 29px;
  background: black;
  color: white;
  }
  .tracks:hover{
    background-color: white;
    color: black;
  }
</style>

<script>
import {mapGetters} from 'vuex';

export default{
  computed:{
    ...mapGetters('spotify',['artisttopgetter']),
  },
  methods: {
    navigateToAlbum(albumId) {
        const baseURL = '/artist';
        const urlWithQuery = `${baseURL}?id=${albumId}`;
        window.location.href = urlWithQuery;
    }
  }
};
</script>