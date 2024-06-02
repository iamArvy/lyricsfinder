<template>
    <section class="Basicinfo topbasic" style="background-color: black; color: white; padding: 1rem;">
        <div class="right">
          <img :src="trackgetter.album.images[1].url" :alt="trackgetter.name">
          <div class="title">
            <h2>{{ trackgetter.name }}</h2>
            <h4>
                <span v-for="(artist, index) in trackgetter.artists" :key="index">
                    <span @click="navigateToArtist(artist.id)" class="link">{{ artist.name }}</span>
                    <span v-if="index < trackgetter.artists.length - 1">, </span>
                </span>
            </h4>
            <div v-if="trackgetter.album.album_type !== 'single'">
                <h5 style="text-transform:capitalize;">
                    <span @click="navigateToAlbum(trackgetter.album.id)" class="link">
                        {{ trackgetter.album.name }} - {{ trackgetter.album.album_type }}
                    </span>
                </h5>
                <h5>Track {{ trackgetter.track_number }} of {{ trackgetter.album.total_tracks }}</h5>
            </div>
            <h5>{{ trackgetter.album.release_date }}</h5>
            <div class="popularity">
                <span v-if="trackgetter.popularity <= 20"><i class="fa-solid fa-star" style="color: #ffffff;"></i></span>
                <span v-else-if="trackgetter.popularity > 20 && trackgetter.popularity <= 40"><i class="fa-solid fa-star" style="color: #ffffff;"></i><i class="fa-solid fa-star" style="color: #ffffff;"></i></span>
                <span v-else-if="trackgetter.popularity > 40 && trackgetter.popularity <= 60"><i class="fa-solid fa-star" style="color: #ffffff;"></i><i class="fa-solid fa-star" style="color: #ffffff;"></i><i class="fa-solid fa-star" style="color: #ffffff;"></i></span>
                <span v-else-if="trackgetter.popularity > 60 && trackgetter.popularity <= 80"><i class="fa-solid fa-star" style="color: #ffffff;"></i><i class="fa-solid fa-star" style="color: #ffffff;"></i><i class="fa-solid fa-star" style="color: #ffffff;"></i><i class="fa-solid fa-star" style="color: #ffffff;"></i></span>
                <span v-else-if="trackgetter.popularity > 80 && trackgetter.popularity <= 100"><i class="fa-solid fa-star" style="color: #ffffff;"></i><i class="fa-solid fa-star" style="color: #ffffff;"></i><i class="fa-solid fa-star" style="color: #ffffff;"></i><i class="fa-solid fa-star" style="color: #ffffff;"></i><i class="fa-solid fa-star" style="color: #ffffff;"></i></span>
            </div>
            <div style="width: 100%; overflow-x: scroll;" class="section">
                <span>
                    {{ trackgetter.external_urls.spotify }}
                </span></div>
          </div>
        </div>
    </section>
</template>

<style scoped>
    .link{
        color: white;
        border-bottom: 2px solid white;
        
    }
    .link:hover{
        cursor: pointer;
        animation: fade-in 1s ease forwards;
    }
</style>

<script>
import {mapGetters} from 'vuex';

export default{
  computed:{
    ...mapGetters('spotify',['trackgetter']),
  },
  methods:{
    navigateToAlbum(albumId) {
        const baseURL = '/album';
        const urlWithQuery = `${baseURL}?id=${albumId}`;
        window.location.href = urlWithQuery;
    },
    navigateToArtist(albumId) {
        const baseURL = '/artist';
        const urlWithQuery = `${baseURL}?id=${albumId}`;
        window.location.href = urlWithQuery;
    }
}
};
</script>