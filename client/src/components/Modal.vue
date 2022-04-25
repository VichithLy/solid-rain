<template>
  <section class="win-container" v-if="winGame === 1">
    <h1>C'est gagné !</h1>
    <p>Vous avez réussi à vaincre votre dépendance à l'Astra-Z !</p>
    <p>Vous allez quitter la partie dans quelques secondes...</p>
  </section>
  <section class="lose-container" v-else-if="winGame === 2">
    <h1>C'est perdu !</h1>
    <p>Vous avez malheureusement rencontré une météorite Bêta-X...</p>
    <p>Vous allez quitter la partie dans quelques secondes...</p>
  </section>
</template>

<script>
//import notification from "../scripts/notification";
import { mapActions } from "vuex";

export default {
  name: "Modal",
  props: {
    winGame: null,
  },
  methods: {
    ...mapActions({
      resetState: "RESET_STATE",
      setAuthenticated: "SET_AUTHENTICATED",
    }),
    endGame() {
      setTimeout(() => {
        // reset store
        this.resetState();
        // clear session storage
        localStorage.clear();
        this.setAuthenticated(false);
        this.$router.push("login");
      }, 10 * 1000);
    },
  },
  async beforeMount() {
    /*if (this.winGame === 1) {
      window.navigator.vibrate([200, 100, 200]);
      // Show notification
      notification.createNotif(
        "Solid Rain",
        "Vous avez réussi à vaincre votre dépendance à l'Astra-Z en récupérant de l'Astra-X, c'est gagné !"
      );
      this.endGame();
    } else if (this.winGame === 2) {
      window.navigator.vibrate(200);
    }*/
  },
};
</script>

<style scoped>
p {
  text-align: center;
  margin-left: 2em;
  margin-right: 2em;
}
.win-container {
  background-color: #42b983;
  color: white;
  padding: 0.2em;
  margin-bottom: 1em;
  font-size: 1.1em;
}
.lose-container {
  background-color: #ef8354;
  color: white;
  padding: 0.2em;
  margin-bottom: 1em;
  font-size: 1.1em;
}
</style>
