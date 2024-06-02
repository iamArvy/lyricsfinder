<!-- <template>
    <div class="artcont">
        <h2>Albums</h2>
        <section >
            <div @click="navigateToAlbum(album.id)" class="link" v-for="(album, index) in artistalbumgetter" :key="index" >
                <div class="tracks">
                <img v-if="album.images && album.images.length > 1" :src="album.images[1].url" alt="Second Image" />
                <div class="det">
                    <h6>{{ album.name }}</h6>
                    <div>
                    <span style="text-transform: capitalize;"> -{{ album.album_type}}</span>
                    </div>
                </div>
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>
.artcont{
    margin-bottom: 2rem;
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
  .tracks:hover{
    background-color: rgb(245, 245, 245);
  }
</style>

<script>
import {mapGetters} from 'vuex';

export default{
  computed:{
    ...mapGetters('spotify',['artistalbumgetter', 'artisttopgetter']),
  },
  methods:{
    navigateToTrack(id) {
        const baseURL = '/album';
        const urlWithQuery = `${baseURL}?id=${id}`;
        window.location.href = urlWithQuery;
    }
  }
  
};
</script> -->

<template>
    <div class="songchart">
        <h2>Albums</h2>
        <div class="board">
            <!-- <h3>THIS WEEK</h3> -->
            <div @click="navigateToAlbum(album.id)" v-for="(album, index) in artistalbumgetter" :key="index" class="charts">
              <!-- <span class="chartnum">{{ index + 1 }}</span> -->
              <img v-if="album.images && album.images.length > 1" :src="album.images[1].url" alt="Second Image" />
              <div class="namechart">
                <span class="song">
                    {{ album.name }}
                </span>
                <span style="text-transform: capitalize;" class="art">{{ album.album_type}}</span>
              </div>
              <span></span>
            </div>
        </div>
      </div>
</template>

<script>
  import {mapGetters } from 'vuex'
  
  
  export default{
    computed:{
      ...mapGetters("spotify",['artistalbumgetter']),
    },
    
  methods:{
    navigateToAlbum(id) {
        const baseURL = '/album';
        const urlWithQuery = `${baseURL}?id=${id}`;
        window.location.href = urlWithQuery;
    }
  }
  };
  </script>

<style scoped>
h2{
  font-weight: 600;
}
img{
  height: 100%;
}
.song{
  font-weight: 600;
  display: block;
}
/* .songchart{
  padding: 5rem;
} */
.namechart{
  padding: 1rem 2rem;
}
.charts:hover{
  min-height: 150px;
  transition: ease-in-out .3s;
}
.charts:hover>.chartnum{
  padding-top: 60px;
  transition: ease-in-out .3s;
}
.charts:hover> .song{
  font-size-adjust: 70px;
}
.charts{
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100px;
  border-bottom: 1px solid black
}
.board>h3{
  font-weight: 600;
  color: white;
  background-color: blue;
  padding: 1rem;
  margin-bottom: unset;
}
.board{
  display: flex;
  flex-direction: column;
}
.chartnum{
  color: white;
  background-color: black;
  font-size: 30px;
  display:block;
  width: 10%;
  height: 100%;
  text-align: center;
  padding-top: 30px;
  font-weight: 600;
  border-bottom: 1px solid white
}
/* .mysearch{
  background-color: red;
} */
form {
  /* position: relative; */
  /* top: 20vh; */
  /* align-items: center; */
  /* display: flex; */
  /* flex-direction: row; */
  border: 2px solid black;
  border-radius: 20px;
  /* left: 15vw; */
  padding: 1rem;
  margin-top: 6rem;
  margin-left: 8rem;
  width: 80%;
  z-index: -1;
  /* margin-top: 3rem; */
}
input{
  width: 90%;
  /* height: 5vh; */
  border: none;
  /* font-size: 5vh; */

}
input:focus{
  outline: none;
}
button{
  background: none;
  border: none;
  /* height: 4vh; */
  /* font-size: 4vh; */
}
button:hover{
  cursor: pointer;
}

.loading {
display: flex;
justify-content: center;
align-items: center;
height: 100vh;
}
@media (max-width: 700px){
  form{
      left: 10vw;
  }
  input{
      font-size: 7vw;
  }
  button{
      font-size: 7vw;
  }
  .songchart{
    padding:1rem;
    width: 100%;
  }
  .chartnum{
    /* height: unset; */
    min-width: 50px;
  }
  .songchart{
    font-size: 12px;
  }
}
</style>