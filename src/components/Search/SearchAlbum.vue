<template>
    <div>
        <h3 style="text-align: center; text-decoration: underline;">Albums</h3>
  <section>
      <div @click="navigateToAlbum(album.id)" class="link" v-for="(album, index) in albumresult" :key="index">
        <div class="tracks">
          <img class="artimg" v-if="album.images && album.images.length > 1" :src="album.images[1].url" alt="Second Image" />
          <div class="det">
              <h6>{{ album.name }}</h6>
              <div>
                <span>-<span v-for="(artist, index) in album.artists" :key="index">
                        {{ artist.name }}<span v-if="index < album.artists.length - 1">, </span>
                    </span>
                </span>
                </div>
          </div>
        </div>
      </div>
    </section>
    </div>
    
</template>

<style scoped>
.artimg{
    max-height: 100px;
}
.det{
  padding: 1rem;
  max-height: 100px;
  overflow: scroll;
}
section{
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
  color: black;
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
  background: #ffffff;
  box-shadow:  8px 8px 16px #8c8c8c,
           -8px -8px 16px #ffffff;
  }
  /* .tracks:nth-child(odd){
    background-color: rgb(245, 245, 245);

  } */
  .tracks:hover{
    background-color: rgb(245, 245, 245);
  }
</style>

<script>
import {mapGetters} from 'vuex';

export default{
computed:{
  ...mapGetters('spotify',['albumresult']),
},
methods:{
    navigateToAlbum(albumId) {
        const baseURL = '/album';
        const urlWithQuery = `${baseURL}?id=${albumId}`;
        window.location.href = urlWithQuery;
    }
}
};
</script>