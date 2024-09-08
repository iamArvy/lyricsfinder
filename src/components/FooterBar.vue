<template>
  <footer>
    <section>
      <div class="logo">
        <img src="../assets/logo.png" alt="" />
        <router-link :to="{ name: 'home' }" class="home"> <h5>LyricsFinder</h5> </router-link>
      </div>
      <div class="copyright">
        <span>Copyright ©2023.</span><span class="slash"> | </span
        ><a href="https://www.iamarvy.com.ng">íɑʍÄrvy</a>
      </div>
      <div class="socialicons">
        <a href=""><i class="fa-brands fa-facebook-f fa-xl" style="color: #ffffff"></i></a>
        <a href=""><i class="fa-brands fa-twitter fa-xl" style="color: #ffffff"></i></a>
        <a href=""><i class="fa-brands fa-instagram fa-xl" style="color: #ffffff"></i></a>
      </div>
    </section>
    <!-- <nav>
        <ul>
            <li><router-link to="/about">About</router-link></li>
            <li><router-link to="/contact">Contact</router-link> </li>
        </ul>
      </nav> -->
  </footer>
</template>

<script>
export default {
  name: 'FooterBar'
}
</script>

<style scoped>
.copyright {
  text-align: center;
}
section {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.socialicons {
  display: flex;
  flex-direction: row;
  gap: 30px;
  padding-right: 2rem;
}
footer {
  background-color: black;
  color: #fff;
  height: 50px;
  padding: 1em;
}
.logo {
  display: flex;
  flex-direction: row;
  gap: 5px;
}
a {
  color: white;
}
li {
  list-style: none;
}
img {
  width: 30px;
}
.home {
  text-decoration: none;
}
@media (max-width: 700px) {
  img {
    width: 30px;
  }
  section {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  footer {
    height: unset;
  }
  .copyright {
    display: flex;
    flex-direction: column;
  }
  .slash {
    display: none;
  }
  .socialicons {
    padding-right: unset;
  }
}
</style>
