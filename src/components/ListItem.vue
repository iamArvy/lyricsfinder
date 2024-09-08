<script setup lang="ts">
import ParameterRouting from './ParameterRouting.vue'
defineProps({
  number: Number,
  image: String,
  title: String,
  artists: String,
  route: String,
  params: String,
  value: String
})
</script>
<template>
  <li class="charts">
    <ParameterRouting :route="route" :params="params" :value="value" class="item">
      <span v-if="number" class="chartnum">{{ number }}</span>
      <figure v-if="image">
        <img :src="image" :alt="title" />
      </figure>
      <figcaption class="namechart">
        <h2 class="song">{{ title }}</h2>
        <p class="art">{{ artists }}</p>
      </figcaption>
    </ParameterRouting>
  </li>
</template>
<style scoped>
li {
  list-style: none;
}
img {
  height: 100%;
}
figure {
  height: 100%;
}
h2 {
  font-weight: 600;
  display: block;
}
figcaption {
  padding: 1rem 2rem;
}
.item:hover {
  min-height: 150px;
  transition: ease-in-out 0.3s;
}
.item:hover > .chartnum {
  padding-top: 60px;
  transition: ease-in-out 0.3s;
}
.item:hover > .song {
  font-size-adjust: 70px;
}
.item {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100px;
  border-bottom: 1px solid black;
  color: black;
}
/* .board > h3 {
  font-weight: 600;
  color: white;
  background-color: blue;
  padding: 1rem;
  margin-bottom: unset;
}
.board {
  display: flex;
  flex-direction: column;
} */
.chartnum {
  color: white;
  background-color: black;
  font-size: 30px;
  display: block;
  width: 10%;
  height: 100%;
  text-align: center;
  padding-top: 30px;
  font-weight: 600;
  border-bottom: 1px solid white;
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
input {
  width: 90%;
  /* height: 5vh; */
  border: none;
  /* font-size: 5vh; */
}
input:focus {
  outline: none;
}
button {
  background: none;
  border: none;
  /* height: 4vh; */
  /* font-size: 4vh; */
}
button:hover {
  cursor: pointer;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
@media (max-width: 700px) {
  form {
    left: 10vw;
  }
  input {
    font-size: 7vw;
  }
  button {
    font-size: 7vw;
  }
  .songchart {
    padding: 1rem;
    width: 100%;
  }
  .chartnum {
    /* height: unset; */
    min-width: 50px;
  }
  .songchart {
    font-size: 12px;
  }
}
</style>
