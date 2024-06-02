<template>
    <header>
      <section class="top-nav">
      <div class="logo">
        <img src="../assets/logo.png" alt="" style="width: 30px;">
        <span @click="home">LyricsFinder</span>
      </div>
      <form @submit.prevent="submitForm" class="searcharea">
        <input type="text" placeholder="Search" v-model="query">
        <button type="submit"><i class="fa-brands fa-searchengin fa-2xl" style="color: #000000;"></i></button>
      </form>
      <input id="ham-toggle" type="checkbox" />
      <label class='hamb-container' for="ham-toggle">
        <div class='hamb-button'></div>
      </label>
  </section>
  </header>
</template>
  
<script>
  import {mapActions} from 'vuex'

  export default {
    name: 'HeaderBarLyrics',
    data() {
    return {
      query: "",
    };
  },
  methods: {
    ...mapActions('details',['']),
    submitForm() {
      if (this.$route.name === "SearchResult") {
      let queryParameters = new URLSearchParams(window.location.search);
      queryParameters.set("q", this.query);
      let newUrl = `${window.location.origin}${window.location.pathname}?${queryParameters.toString()}`
      window.location.href = newUrl;
    } else {
        const baseURL = '/searchresult';
        const urlWithQuery = `${baseURL}?q=${this.query}`;
        window.location.href = urlWithQuery;    
      }
    },
    home(){
      let url = '/';
      window.location.href=url;
    }
  },
  };
</script>

<style>
.logo{
  cursor: pointer;
}
.logo{
  display: flex;
  flex-direction: row;
  gap: 5px;
}
form {
    align-items: center;
    display: flex;
    flex-direction: row;
    background-color: white;
    border-radius: 20px;
    padding: 0.5rem;
  }
  input{
    width: 20vw;
    border: none;

  }
  input:focus{
    outline: none;
  }
  button{
    background: none;
    border: none;
    color: white;
  }
  button:hover{
    cursor: pointer;
  }
.home{
  text-decoration: none;
  color: white;
}
.home:hover{
  color:white
}
.top-nav {
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: black;
  color: #FFF;
  height: 50px;
  padding: 1em;
  gap: 25vw;
  position: fixed;
  width: 100vw;
  top: 0;
}

.menu {
  display: flex;
  flex-direction: row;
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.menu > li {
  margin: 0 1rem;
  overflow: hidden;
}

.hamb-container {
  display: none;
  height: 100%;
  width: 30px;
  cursor: pointer;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#ham-toggle {
  display: none;
}

.hamb-button,
.hamb-button::before,
.hamb-button::after {
  display: block;
  background-color: #fff;
  position: absolute;
  height: 4px;
  width: 30px;
  transition: transform 400ms cubic-bezier(0.23, 1, 0.32, 1);
  border-radius: 2px;
}

.hamb-button::before {
  content: "";
  margin-top: -8px;
  /* display: none; */
}

.hamb-button::after {
  content: "";
  margin-top: 8px;
  /* display: none; */
}

#ham-toggle:checked + .hamb-container .hamb-button::before {
  margin-top: 0px;
  transform: rotate(405deg);
}

#ham-toggle:checked + .hamb-container .hamb-button {
  background: rgba(255, 255, 255, 0);
}

#ham-toggle:checked + .hamb-container .hamb-button::after {
  margin-top: 0px;
  transform: rotate(-405deg);
}

@media (max-width: 700px) {
  .hamb-container {
    display: flex;
  }

  .menu {
    position: absolute;
    top: 0;
    margin-top: 50px;
    left: 0;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;
  }

  #ham-toggle ~ .menu li {
    height: 0;
    margin: 0;
    padding: 0;
    border: 0;
    transition: height 400ms cubic-bezier(0.23, 1, 0.32, 1);
  }

  #ham-toggle:checked ~ .menu li {
    border: 1px solid #333;
    height: 2.5em;
    padding: 0.5em;
    transition: height 400ms cubic-bezier(0.23, 1, 0.32, 1);
  }

  .menu > li {
    display: flex;
    justify-content: center;
    margin: 0;
    padding: 0.5em 0;
    width: 100%;
    color: white;
    background-color: black;
  }

  .menu > li:not(:last-child) {
    border-bottom: 1px solid #444;
  }
}
</style>
