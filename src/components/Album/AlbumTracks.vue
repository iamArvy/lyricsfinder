<template>
    <section class="songchart">
        <h2>Tracklist:</h2>
        <div class="board">
            <div @click="navigateToTrack(track.id)" class="charts" v-for="(track, index) in albumgetter.tracks.items" :key="index">
              <span class="chartnum">{{ track.track_number }}</span>
              <!-- <img :src="alb.item.song_art_image_url" :alt="index"> -->
              <div class="namechart">
                <span class="song">
                  {{ track.name }}
                </span>
                <span v-for="(artist, index) in track.artists" :key="index">
                    <span>{{ artist.name }}</span>
                    <span v-if="index < track.artists.length - 1">, </span>
                </span>
              </div>
            </div>
        </div>
    </section>
</template>

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
.songchart{
  padding: 6rem;
}
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

<script>
import {mapGetters} from 'vuex';

export default{
  computed:{
    ...mapGetters('spotify',['albumgetter']),
  },
  methods:{
    navigateToTrack(id) {
        const baseURL = '/track';
        const urlWithQuery = `${baseURL}?id=${id}`;
        window.location.href = urlWithQuery;
    }
  }
  
};
</script>