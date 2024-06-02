<template>
    <div class="songchart">
        <h2>Genius Weekly Top 20 Lyrics</h2>
        <div class="board">
            <h3>THIS WEEK</h3>
            <div @click="navigateToSearch(alb.item.title + ' ' + alb.item.artist_names)"  class="charts" v-for="(alb, index) in albcharts" :key="alb.id">
              <span class="chartnum">{{ index + 1 }}</span>
              <img :src="alb.item.song_art_image_url" :alt="index">
              <div class="namechart">
                <span class="song">
                  {{ alb.item.title }}
                </span>
                <span class="art">{{ alb.item.artist_names }}</span>
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
      ...mapGetters("spotify",['albcharts']),
    },
    methods:{
    navigateToSearch(albumId) {
        const baseURL = '/searchresult';
        const urlWithQuery = `${baseURL}?q=${albumId}`;
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