<template>
    <section class="Basicinfo topbasic" style="background-color: black; color: white; padding: 1rem;">
        <div class="right">
          <img :src="albumgetter.images[1].url" :alt="albumgetter.name">
          <div class="title">
            <h2>{{ albumgetter.name }}</h2>
            <h4>
              <span v-for="(artist, index) in albumgetter.artists" :key="index">
                    <span @click="navigateToArtist(artist.id)" class="link">{{ artist.name }}</span>
                    <span v-if="index < albumgetter.artists.length - 1">, </span>
                </span>
            </h4>
            <h5>{{ albumgetter.release_date}}</h5>
            <div style="width: 100%; overflow-x: scroll; " class="section">
                <span>
                  {{ albumgetter.external_urls.spotify }}
                </span>
              </div>
          </div>
        </div>
    </section>
</template>

<style>
.link{
  border-bottom: white;
}
</style>

<script>
import {mapGetters} from 'vuex';

export default{
  computed:{
    ...mapGetters('spotify',['albumgetter']),
  },
  methods:{
    navigateToArtist(albumId) {
        const baseURL = '/artist';
        const urlWithQuery = `${baseURL}?id=${albumId}`;
        window.location.href = urlWithQuery;
    }
  }
};
</script>