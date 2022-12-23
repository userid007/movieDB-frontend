<template>
  <div id="app">
    <nav
      class="navbar navbar-white navbar-expand-lg"
      aria-label="Toggle navigation"
    >
      <div class="container-fluid">
        <a class="navbar-brand">MovieDB</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link" aria-current="page" to="/home"
                >Home</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" aria-current="page" to="/create"
                >Create Playlist</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" aria-current="page" to="/private"
                >My Playlist</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" aria-current="page" to="/public"
                >Public Playlist</router-link
              >
            </li>
          </ul>
          <div v-show="!loggedin">
            <ul class="navbar-nav">
              <li class="nav-item">
                <router-link
                  class="d-flex nav-link"
                  aria-current="page"
                  to="/login"
                  >Login</router-link
                >
              </li>
              <li class="nav-item">
                <router-link
                  class="d-flex nav-link"
                  aria-current="page"
                  to="/register"
                  >Register</router-link
                >
              </li>
            </ul>
          </div>
          <div v-show="loggedin">
            <ul class="navbar-nav">
              <li class="nav-item">
                <router-link
                  class="d-flex nav-link"
                  aria-current="page"
                  to="/logout"
                  >Logout</router-link
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>
<script>
import mixin from "./mixin";
export default {
  mixins: [mixin],
  data() {
    return {
      loggedin: false,
    };
  },
  beforeMount() {
    console.log(localStorage.getItem("accessToken"));
    if (localStorage.getItem("accessToken")) {
      this.loggedin = true;
    } else {
      this.loggedin = false;
    }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  min-height: 100vh;
}

nav {
  padding: 30px;
  background: rgb(255, 221, 152);
  border-bottom: 1px solid grey;
  border-radius: 0px 0px 6px 6px;
}
.nav-link {
  color: black;
}
nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
