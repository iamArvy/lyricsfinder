<template>
    <section class="Basicinfo topbasic" style="background-color: black; color: white; padding: 1rem;">
        <div class="right">
          <img :src="artistgetter.images[1].url" :alt="artistgetter.name">
          <div class="title">
            <h2>{{ artistgetter.name }}</h2>
            <h4 >{{ artistgetter.followers.total }} followers</h4>
            <h4>
                <span style="text-transform: capitalize;" v-for="(genre, index) in artistgetter.genres" :key="index">
                    {{ genre }}<span v-if="index < artistgetter.genres.length - 1">, </span>
                </span>
            </h4>
            <h5>{{ artistgetter.release_date}}</h5>
            <div class="popularity">
                  <span v-if="artistgetter.popularity <= 20"><i class="fa-solid fa-star" style="color: #ffffff;"></i></span>
                  <span v-else-if="artistgetter.popularity > 20 && artistgetter.popularity <= 40"><i class="fa-solid fa-star" style="color: #ffffff;"></i><i class="fa-solid fa-star" style="color: #ffffff;"></i></span>
                  <span v-else-if="artistgetter.popularity > 40 && artistgetter.popularity <= 60"><i class="fa-solid fa-star" style="color: #ffffff;"></i><i class="fa-solid fa-star" style="color: #ffffff;"></i><i class="fa-solid fa-star" style="color: #ffffff;"></i></span>
                  <span v-else-if="artistgetter.popularity > 60 && artistgetter.popularity <= 80"><i class="fa-solid fa-star" style="color: #ffffff;"></i><i class="fa-solid fa-star" style="color: #ffffff;"></i><i class="fa-solid fa-star" style="color: #ffffff;"></i><i class="fa-solid fa-star" style="color: #ffffff;"></i></span>
                  <span v-else-if="artistgetter.popularity > 80 && artistgetter.popularity <= 100"><i class="fa-solid fa-star" style="color: #ffffff;"></i><i class="fa-solid fa-star" style="color: #ffffff;"></i><i class="fa-solid fa-star" style="color: #ffffff;"></i><i class="fa-solid fa-star" style="color: #ffffff;"></i><i class="fa-solid fa-star" style="color: #ffffff;"></i></span>
                </div>
          </div>
        </div>
    </section>
</template>

<style>
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
    ...mapGetters('spotify',['artistgetter']),
  },
};
</script>