<template>
    <section class="main" >
        <h4 style="text-align: center;">{{ trackgetter.artists[0].name }} - {{ trackgetter.name }}</h4>
        <div class="songlyrics" v-for="lyric in lyricsgetter" :key="lyric.id">
            <span v-if="lyricsgetter">{{ lyric.words }}</span>
            <h2 style="text-align: center;" v-else>Lyrics for this song is currently unavailable</h2>
        </div>
        <div class="preview"  align="center" style="margin-top: 20px;">
          <h6>Audio Preview</h6>
          <audio :src="trackgetter.preview_url" type="mp3" controls :alt="trackgetter.name"> </audio>
        </div>
        <div class="spotify"  align="center">
          <i class="fa-brands fa-spotify"></i>
          <a :href="trackgetter.uri">Open In Spotify</a>
        </div>
        <div class="mydown" align="center" style="padding-top: 10px;">
          <!-- <button class="todown" @click="download">CLICK TO DOWNLOAD<i class="fa-solid fa-download"></i></button> <br>
          <div class="vvv" v-if="downloadgetter" >
            <a :href="downloadgetter" style="text-decoration: underline;" >Download Link </a>
          </div> -->
        </div>
    </section>
</template>

<style>
</style>

<script>
import {mapGetters} from 'vuex';

export default{
  computed:{
    ...mapGetters('spotify',['albumgetter', 'lyricsgetter', 'trackgetter', 'downloadgetter']),
  },
};
</script>