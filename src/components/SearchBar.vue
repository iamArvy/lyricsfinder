<script setup>
import { ref } from 'vue'
const query = ref('')
const submitForm = () => {
  window.location.href = `/search?q=${query.value.toString()}`
}
</script>
<template>
  <form @submit.prevent="submitForm" class="searcharea">
    <input type="text" placeholder="Search" v-model="query" />
    <button type="submit">
      <i class="fa-brands fa-searchengin fa-2xl" style="color: #000000"></i>
    </button>
  </form>
</template>
<style scoped>
form {
  align-items: center;
  display: flex;
  flex-direction: row;
  background-color: white;
  border-radius: 20px;
  padding: 0.5rem;
}
input {
  width: 200px;
  border: none;
}
input:focus {
  outline: none;
}
button {
  background: none;
  border: none;
  color: white;
}
button:hover {
  cursor: pointer;
}
</style>
