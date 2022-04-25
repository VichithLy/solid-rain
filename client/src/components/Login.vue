<template>
  <section class="container">
    <div class="loader-container" v-if="loader">
      <div class="loader"></div>
      <div class="loader-text">{{ loaderTxt }}</div>
    </div>
    <h2>Formulaire de connexion</h2>

    <div v-if="error" class="error">{{ error }}</div>

    <div class="container">
      <form @submit="handleSubmit">
        <div class="row">
          <div class="col-25">
            <label for="username">Nom d'utilisateur</label>
          </div>
          <div class="col-75">
            <input
              type="text"
              id="username"
              name="username"
              v-model="username"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="password">Mot de passe</label>
          </div>
          <div class="col-75">
            <input
              type="password"
              id="password"
              name="password"
              v-model="password"
            />
          </div>
        </div>
        <div class="row">
          <input id="submit" type="submit" value="Login" />
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from "vuex";
import geolocation from "../scripts/geolocation";
import notification from "../scripts/notification";
import game from "../api-client/game";
const springApi = "http://localhost:8080/";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      loader: false,
      loaderTxt: "",
      error: "",
      gameStatusInterval: null,
    };
  },
  computed: {
    ...mapState({
      authenticated: "authenticated",
      gameStatus: "gameStatus",
      zrr: "zrr",
      player: "player",
    }),
  },
  methods: {
    ...mapActions({
      setAuthenticated: "SET_AUTHENTICATED",
      setGameStatus: "SET_GAME_STATUS",
      setZrr: "SET_ZRR",
      setPlayerIcon: "SET_PLAYER_ICON",
      setPlayerId: "SET_PLAYER_ID",
      setPlayerPos: "SET_PLAYER_POSITION",
      setPlayerTTL: "SET_PLAYER_TTL",
      setTTLCreation: "SET_TTL_CREATION",
      setPlayers: "SET_PLAYERS",
      setMeteorites: "SET_METEORITES",
      setCurrentLat: "SET_CURRENT_LAT",
      setCurrentLng: "SET_CURRENT_LNG",
      setPlayerTrophy: "SET_PLAYER_TROPHY",
    }),
    vibrate() {
      window.navigator.vibrate([
        100,
        30,
        100,
        30,
        100,
        30,
        200,
        30,
        200,
        30,
        200,
        30,
        100,
        30,
        100,
        30,
        100,
      ]); // Vibrate 'SOS' in Morse.
    },
    /////////////////////////////////////////////////////
    ////////////// FUNCTIONS
    //
    handleSubmit(e) {
      e.preventDefault();
      if (this.username === "" && this.password === "") {
        this.error =
          "Nom d'utilisateur et/ou mot de passe ne doivent pas être vides !";
      } else {
        // Checking if player is a part of the game
        game.getPlayerById(this.username).then((res) => {
          console.log("getPlayerById");
          if (res.status === 404) {
            console.log(res.status);
            this.error = "Vous ne pouvez pas rejoindre le jeu !";
          } else {
            this.logPlayer().then((res) => {
              console.log("logPlayer");
              if (res.status === 204) {
                this.loader = false;
                // Web storage
                localStorage.setItem("token", res.headers.get("Authorization"));
                this.setAuthenticated(true);
                // Initialize all data
                this.setData(res);
                // Notification permission
                notification.requestNotifPerm().then(() => {
                  this.setPos();
                });
              } else {
                this.loader = false;
                this.error =
                  "Nom d'utilisateur et/ou mot de passe non valides !";
                localStorage.clear();
              }
            });
          }
        });
      }
    },
    async logPlayer() {
      this.loaderTxt = "En attente de la connexion du joueur...";
      this.loader = true;

      const formData = {
        login: this.username,
        password: this.password,
      };

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      };

      const res = await fetch(springApi + "/login", requestOptions);

      return res;
    },
    setData() {
      console.log("setData");
      //GAME
      this.setGameStatus();
      // ZRR
      this.setZrr();
      // Player
      this.setPlayerId(this.username);
      this.setPlayerTTL(this.username);
      this.setTTLCreation(Date.now());
      this.setPlayerIcon(this.username);
      this.setPlayerTrophy(this.username);
      // Players
      this.setPlayers();
      // Meteorites
      this.setMeteorites();
    },
    setPos() {
      console.log("setPos");
      this.loaderTxt = "En attente de la position du joueur...";
      this.loader = true;

      // Position permission
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            // PLAYER
            //this.setPlayerPos([45.78207, 4.8656])
            this.setPlayerPos([
              position.coords.latitude,
              position.coords.longitude,
            ]);
            // MAP FOCUS
            this.setCurrentLat(position.coords.latitude);
            this.setCurrentLng(position.coords.longitude);
            // WAIT UNTIL GAME STARTS
            this.waitGameStart();
          },
          (error) => {
            geolocation.handleError(error);
            this.loader = false;
          },
          geolocation.options
        );
      } else {
        this.loader = false;
        alert("La géolocalisation n'est pas supportée par le navigateur.");
      }
    },
    waitGameStart() {
      console.log("waitGameStart");
      this.loaderTxt = "En attente du début de la partie...";

      this.gameStatusInterval = setInterval(() => {
        this.setGameStatus();
        if (this.gameStatus === true) {
          this.setStorage();

          // Show notification
          notification.createNotif("Solid Rain", "La partie a commencé !");
          this.$router.push({ name: "Map" });
        }
      }, 1000);
    },
    setStorage() {
      console.log("setStorage");
      this.loader = false;

      localStorage.setItem("gameStatus", this.gameStatus);
      localStorage.setItem("playerId", this.player.id);
      localStorage.setItem("zrr", JSON.stringify(this.zrr));
      localStorage.setItem("playerIcon", this.player.icon);
      localStorage.setItem("playerPos", JSON.stringify(this.player.position));
      localStorage.setItem(
        "timestampTTL",
        JSON.stringify(this.player.ttl_creation_timestamp)
      );
    },
  },
  beforeUnmount() {
    clearInterval(this.gameStatusInterval);
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}
input[type="text"],
input[type="password"],
select,
textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
}
label {
  padding: 12px 12px 12px 0;
  display: inline-block;
}
input[type="submit"] {
  background-color: white;
  color: black;
  font-weight: bold;
  padding: 12px 20px;
  border: 3px solid black;
  border-radius: 4px;
  cursor: pointer;
  float: right;
  margin-top: 12px;
}
input[type="submit"]:hover {
  background-color: black;
  color: white;
}

section {
  margin-top: 2em;
}

.container {
  border-radius: 5px;
  background-color: #42b983;
  padding: 20px;
  color: black;
}
.col-25 {
  float: left;
  width: 25%;
  margin-top: 6px;
}
.col-75 {
  float: left;
  width: 75%;
  margin-top: 6px;
}
/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}
/* Responsive layout - when the screen is less than 600px wide, make the two columns stack on top of each other instead of next to each other */
@media screen and (max-width: 600px) {
  .col-25,
  .col-75,
  input[type="submit"] {
    width: 100%;
    margin-top: 0;
  }
  #submit {
    margin-top: 2em;
  }
}
/* LOADER */
.loader-container {
  position: absolute;
  z-index: 1;
  left: 50%;
  margin-left: -50px;
  top: 50%;
  margin-top: -50px;
}
.loader {
  border: 16px solid white;
  border-radius: 50%;
  border-top: 16px solid #42b983;
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
}
.loader-text {
  margin-top: 20px;
  position: absolute;
  font-weight: bolder;
  font-size: large;
  color: white;
}
/* ERROR */
.error {
  border: 2px solid red;
  background-color: pink;
  padding: 1em;
  font-weight: bold;
  border-radius: 1em;
}

/* Safari */
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
