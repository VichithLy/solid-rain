<template>
  <div id="nav">
    <div><router-link to="/">Accueil</router-link></div>
    <div v-if="authenticated"><router-link to="/map">Carte</router-link></div>
    <div v-if="authenticated">
      <router-link to="/profile">Profile</router-link>
    </div>
    <div><router-link to="/about">À propos</router-link></div>
    <div v-if="!authenticated">
      <router-link to="/login">Se connecter</router-link>
    </div>
    <div v-else-if="authenticated">
      <button class="logout-btn" @click="logout">Se déconnecter</button>
    </div>
  </div>
  <router-view />
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "App",
  computed: {
    ...mapState({
      authenticated: "authenticated",
    }),
  },
  methods: {
    ...mapActions({
      resetState: "RESET_STATE",
      setAuthenticated: "SET_AUTHENTICATED",
    }),
    logout() {
      // reset store
      this.resetState();
      // clear session storage
      localStorage.clear();
      this.setAuthenticated(false);
      this.$router.push("login");
    },
  },
};
</script>

<style>
html {
  background-image: url("./assets/img/space.jpg");
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  display: flex;
  flex-wrap: wrap;
  margin-top: 1em;
  font-size: 1em;
  justify-content: center;
  align-items: center;
}
#nav div {
  margin-right: 0.5em;
  padding-right: 0.5em;
  border-right: 2px solid;
  margin-top: 0.5em;
}
#nav div:last-child {
  border-right: none;
}
#nav a {
  font-weight: bold;
  color: white;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
.logout-btn {
  border: 3px solid transparent;
  border-radius: 5px;
  padding: 0.1em 0.2em;
  font-weight: bolder;
}
.logout-btn:active {
  border: 3px solid #42b983;
}
.logout-btn:hover {
  cursor: pointer;
}
</style>
