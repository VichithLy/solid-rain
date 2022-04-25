<!-- --------------------------------------------
-------------------- TEMPLATE -------------------
--------------------------------------------- -->
<template>
  <section>
    <h1 class="welcome-player">
      À toi de jouer <span class="player-id">{{ player.id }}</span> !
    </h1>

    <!-- MODAL -->
    <div v-if="winGame >= 1">
      <Modal v-bind:win-game="winGame" />
    </div>

    <div class="map-container">
      <!-- MAP -->
      <div id="map" className="map"></div>
    </div>

    <!-- TTL -->
    <div
      id="danger"
      v-if="player.current_ttl !== null && player.current_ttl <= 0"
    >
      /!\ TTL du joueur expiré /!\
    </div>

    <div id="ttlDiv">
      <strong>TTL : </strong>
      <span class="currentTTLSpan" v-if="player.current_ttl >= 100000">
        {{ Infinity }}
      </span>
      <span class="currentTTLSpan" v-else-if="player.current_ttl >= 0">
        {{ player.current_ttl }}
      </span>
      <span class="currentTTLSpan" v-else> 0 </span>
    </div>

    <!-- METEORITES -->
    <div id="sucess" v-if="gotMeteorite">{{ gotMeteorite }} récupérée !</div>

    <!-- // FOR TESTING
    <h1>Tests :</h1>
    <button @click="vibrate">Vibrations</button>
    <button @click="notify">Notification</button>
    <button @click="astraX_TTL">Astra-X</button>
    <button @click="astraZ_TTL">Astra-Z</button>
    <button @click="betaX_TTL">Beta-X</button>-->
  </section>
</template>

<!-- --------------------------------------------
--------------------- SCRIPT --------------------
--------------------------------------------- -->

<script>
import Modal from "./Modal";
import "leaflet/dist/leaflet.css";
import { mapGetters, mapActions, mapState } from "vuex";
import manageMap from "../scripts/manageMap";
import geolocation from "../scripts/geolocation";
import api from "../api-client/game";
import { Icon } from "leaflet";
import game from "../api-client/game";
import notification from "../scripts/notification";

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

export default {
  name: "Map",
  components: { Modal },
  // -------------------------------------------------
  // ---------------------- DATA ---------------------
  // -------------------------------------------------
  data() {
    return {
      markers: {
        playerMarker: null,
        playersMarkers: [],
        playersLayerGrp: null,
        meteoritesMarkers: [],
        meteoritesLayerGrp: null,
        distanceBetweenPlayerAndMeteorite: null,
      },
      ttlInterval: null,
      updateInterval: null,
      updater: 0,
      gotMeteorite: null,
      watchPosId: null,
      winGame: null,
    };
  },
  // -------------------------------------------------
  // ------------------- COMPUTED --------------------
  // -------------------------------------------------
  computed: {
    ...mapState({
      authenticated: "authenticated",
      zrr: "zrr",
      player: "player",
      players: "players",
      meteorites: "meteorites",
    }),
    ...mapGetters({
      mymap: "GET_MYMAP",
      lat: "GET_CURRENT_LAT",
      lng: "GET_CURRENT_LNG",
      zoom: "GET_CURRENT_ZOOM",
    }),
    getPlayers() {
      // Players except the one connected
      let otherPlayers = [];
      this.players.forEach((player) => {
        if (player.id !== this.player.id) {
          otherPlayers.push(player);
        }
      });
      return otherPlayers;
    },
    playerCurrentPosition() {
      return this.player.position;
    },
    isUpdating() {
      return this.updater;
    },
    getNbAstraZ() {
      let count = 0;
      this.player.trophies.forEach((trophy) => {
        if (trophy.type === "Astra-Z") count++;
      });
      return count;
    },
  },
  // -------------------------------------------------
  // --------------------- WATCH ---------------------
  // -------------------------------------------------
  watch: {
    playerCurrentPosition: async function () {
      const L = await import("leaflet");
      if (
        this.markers.playerMarker !== null &&
        this.player.position.length !== 0
      ) {
        let newLatLng = new L.LatLng(
          this.player.position[0],
          this.player.position[1]
        );
        this.markers.playerMarker.setLatLng(newLatLng);
      }
    },
    isUpdating: async function () {
      const L = await import("leaflet");
      // UPDATING PLAYERS
      this.setPlayers().then(() => {
        if (this.getPlayers.length !== 0) {
          manageMap.drawPlayers(L, this.markers, this.getPlayers, this.mymap);
        }
      });
      // UPDATING METEORITES
      this.setMeteorites().then(() => {
        if (this.meteorites.length !== 0) {
          manageMap.drawMeteorites(
            L,
            this.markers,
            this.meteorites,
            this.mymap
          );
        }
      });
    },
  },
  // -------------------------------------------------
  // -------------------- METHODS --------------------
  // -------------------------------------------------
  methods: {
    ...mapActions({
      resetState: "RESET_STATE",
      setAuthenticated: "SET_AUTHENTICATED",
      // MAP
      setMymap: "SET_MYMAP",
      setLat: "SET_CURRENT_LAT",
      setLng: "SET_CURRENT_LNG",
      setZoom: "SET_CURRENT_ZOOM",
      setZrr: "SET_ZRR",
      // PLAYER
      setPlayerId: "SET_PLAYER_ID",
      setPlayerPos: "SET_PLAYER_POSITION",
      setPlayerTTL: "SET_PLAYER_TTL",
      setCurrentTTL: "SET_CURRENT_TTL",
      setPlayerIcon: "SET_PLAYER_ICON",
      setTTLCreation: "SET_TTL_CREATION",
      // OTHERS
      setPlayers: "SET_PLAYERS",
      setMeteorites: "SET_METEORITES",
      setPlayerTrophy: "SET_PLAYER_TROPHY",
    }),
    verifyMeteorites(from, to) {
      // CALCULATING DISTANCE BETWEEN PLAYER AND METEORITE
      to.map((meteorite) => {
        if (from.distanceTo(meteorite.marker.getLatLng()) <= 10) {
          game
            .addTrophy(this.player.id, meteorite.id, meteorite.type)
            .then((res) => {
              if (res.status !== 409) {
                // Not already catched
                if (meteorite.type === "Astra-Z") {
                  notification.createNotif(
                    "Solid Rain",
                    "Vous avez rencontré une météorite " + meteorite.type + " !"
                  );
                  this.astraZ_TTL(meteorite.id);
                } else if (meteorite.type === "Astra-X") {
                  this.astraX_TTL(meteorite.id);
                } else if (meteorite.type === "Bêta-X") {
                  this.betaX_TTL(meteorite.id);
                }
                this.gotMeteorite = meteorite.type;
              }
            })
            .then(() => {
              this.setPlayerTrophy(this.player.id);
            });
        }
      });
    },
    astraZ_TTL(id) {
      this.winGame = 0;
      game.deleteMeteorite(id);
      let addiction = this.getNbAstraZ * 10 * 1000;
      this.setPlayerTTL(this.player.id);
      this.setTTLCreation(Date.now() - addiction);
      localStorage.setItem(
        "timestampTTL",
        JSON.stringify(this.player.ttl_creation_timestamp)
      );
    },
    astraX_TTL(id) {
      this.winGame = 1;
      game.deleteMeteorite(id);
      let addiction = 60 * 60 * 24 * 360;
      this.setPlayerTTL(this.player.id);
      this.setTTLCreation(Date.now() + addiction * 1000);
      localStorage.setItem(
        "timestampTTL",
        JSON.stringify(this.player.ttl_creation_timestamp)
      );
    },
    betaX_TTL(id) {
      this.winGame = 2;
      game.deleteMeteorite(id);
      let addiction = 60 * 60 * 24 * 360;
      this.setPlayerTTL(this.player.id);
      this.setTTLCreation(Date.now() - addiction);
      localStorage.setItem(
        "timestampTTL",
        JSON.stringify(this.player.ttl_creation_timestamp)
      );
    },
    getCurrentTTL() {
      const ttl = this.player.ttl;
      const ttlCreation = Math.round(this.player.ttl_creation_timestamp / 1000);
      const currentDate = Math.round(Date.now() / 1000);
      const currentTTL = ttl - (currentDate - ttlCreation);

      if (this.player.ttl !== null && currentTTL >= 0) {
        this.setCurrentTTL(currentTTL);
        localStorage.setItem("currentTTL", JSON.stringify(currentTTL));
      } else {
        // Game lost
        this.setCurrentTTL(0);
        localStorage.setItem("currentTTL", JSON.stringify(0));

        // Stop decrementing TTL
        clearInterval(this.ttlInterval);
        this.endGame();
      }
    },
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
    vibrate() {
      navigator.vibrate([
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
    notify() {
      notification.createNotif("Solid Rain", "Test de notification");
    },
  },
  async created() {
    // Check if user is authenticated
    if (this.authenticated === true) {
      this.ttlInterval = setInterval(this.getCurrentTTL, 1000);
      this.updateInterval = setInterval(() => {
        this.updater++;
      }, 2000);

      const L = await import("leaflet");
      this.setPlayers();
      this.setMeteorites();

      setTimeout(() => {
        if (this.getPlayers.length !== 0) {
          manageMap.drawPlayers(L, this.markers, this.getPlayers, this.mymap);
        }
        if (this.meteorites.length !== 0) {
          manageMap.drawMeteorites(
            L,
            this.markers,
            this.meteorites,
            this.mymap
          );
        }
      }, 500);
    }
  },
  async beforeMount() {
    // -------------------------------------------------
    // ------------------ CREATING MAP -----------------
    // -------------------------------------------------

    const L = await import("leaflet");

    this.setMymap(
      L.map("map", {
        center: [this.lat, this.lng],
        zoom: this.zoom,
      })
    );

    manageMap.drawMap(L, this.mymap, this.lat, this.lng, this.zoom);

    // -------------------------------------------------
    // ------------------ MAP EVENTS -------------------
    // -------------------------------------------------

    this.mymap.on("dragend", (e) => {
      this.setLat(e.target.getCenter().lat);
      this.setLng(e.target.getCenter().lng);
    });
    this.mymap.on("zoomend", () => {
      this.setZoom(this.mymap.getZoom());
    });
  },
  async mounted() {
    const L = await import("leaflet");

    // -------------------------------------------------
    // --------------- MARKERS & LAYERS ----------------
    // -------------------------------------------------

    // ZRR
    if (this.zrr.length !== 0) manageMap.drawZrr(L, this.zrr, this.mymap);
    // PLAYER
    if (this.player.position.length !== 0 && this.player.icon !== null)
      manageMap.drawPlayer(L, this.markers, this.player, this.mymap);

    // PLAYERS
    if (this.getPlayers.length !== 0)
      manageMap.drawPlayers(L, this.markers, this.getPlayers, this.mymap);

    // METEORITES
    if (this.meteorites.length !== 0)
      manageMap.drawMeteorites(L, this.markers, this.meteorites, this.mymap);

    // -------------------------------------------------
    // ------------ WATCH PLAYER POSITION --------------
    // -------------------------------------------------

    if (navigator.geolocation) {
      if (this.player.position.length !== 0) {
        this.watchPosId = navigator.geolocation.watchPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            // Set state
            this.setPlayerPos([lat, lng]).then(() => {
              api.setPlayerPos(this.player.id, [lat, lng]);
            });

            // VERIFY IF USER CATCHES METEORITE
            setTimeout(() => {
              if (
                this.meteorites.length !== 0 &&
                this.player.position.length !== 0 &&
                this.markers.meteoritesMarkers.length !== 0 &&
                this.markers.playerMarker !== null
              ) {
                this.verifyMeteorites(
                  this.markers.playerMarker.getLatLng(),
                  this.markers.meteoritesMarkers
                );
              }
            }, 500);
          },
          (error) => {
            geolocation.handleError(error);
          },
          geolocation.options
        );
      }
    } else {
      alert("La géolocalisation n'est pas supportée par le navigateur.");
    }
  },
  beforeUnmount() {
    // Delete markers
    manageMap.deleteAllMarkers(this.markers, this.mymap);
    // Delete intervals
    clearInterval(this.ttlInterval);
    clearInterval(this.updateInterval);
    // Delete watch position
    geolocation.stopWatchCurrentPos(this.watchPosId);
    //this.watchPosId = null;
  },
};
</script>

<!-- --------------------------------------------
--------------------- STYLE ---------------------
--------------------------------------------- -->

<style scoped>
section {
  color: white;
}
.map-container {
  display: flex;
  justify-content: center;
}
#map {
  height: 400px;
  width: 99%;
  border: 5px solid #42b983;
}
#ttlDiv {
  margin-top: 2em;
  padding: 1em;
  border: 5px solid;
}
#distDiv {
  margin-top: 2em;
  padding: 1em;
  border: 5px solid;
}
#danger {
  margin-top: 2em;
  color: #ef8354;
  font-weight: bold;
  border: 5px solid #ef8354;
  padding: 1em;
  margin-bottom: 2em;
}

#sucess {
  color: #42b983;
  font-weight: bold;
  border: 5px solid #42b983;
  padding: 1em;
  margin-bottom: 2em;
  margin-top: 1em;
}
button {
  background-color: lightgrey;
  border: solid 3px black;
  width: 50%;
  height: 3em;
  cursor: pointer;
}
button:hover {
  background-color: gray;
}
.welcome-player {
  margin-top: 2em;
}
.player-id {
  color: #42b983;
}
.currentTTLSpan {
  font-weight: bolder;
  color: #42b983;
}
</style>
