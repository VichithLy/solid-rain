<template>
  <section class="container">
    <div id="icon">
      <div id="playerId">
        <h1>{{ player.id }}</h1>
      </div>
      <div class="img-container">
        <img
          v-if="player.icon"
          id="image"
          :src="require(`../assets/img/${getProfilePic}`)"
          class="img-thumbnail"
          alt="logo"
        />
      </div>
    </div>
    <div id="listIcon">
      <p>Choisi ton image de profil :</p>
      <form v-on:submit="(e) => setPicture(e, selectedPic)">
        <label for="logo1">
          <input
            type="radio"
            id="logo1"
            name="icon"
            value="logo1.png"
            v-model="selectedPic"
          />
          <img src="../assets/img/logo1.png" />
        </label>

        <label for="logo2">
          <input
            type="radio"
            id="logo2"
            name="icon"
            value="logo2.png"
            v-model="selectedPic"
          />
          <img src="../assets/img/logo2.png" />
        </label>

        <label for="logo3">
          <input
            type="radio"
            id="logo3"
            name="icon"
            value="logo3.png"
            v-model="selectedPic"
          />
          <img src="../assets/img/logo3.png" />
        </label>

        <label for="logo4">
          <input
            type="radio"
            id="logo4"
            name="icon"
            value="logo4.jpg"
            v-model="selectedPic"
          />
          <img src="../assets/img/logo4.jpg" />
        </label>

        <label for="logo5">
          <input
            type="radio"
            id="logo5"
            name="icon"
            value="logo5.png"
            v-model="selectedPic"
          />
          <img src="../assets/img/logo5.png" />
        </label>
        <button type="submit" id="updateIcon">Changer de profile</button>
      </form>
    </div>
    <div class="table-container">
      <table class="blueTable">
        <thead>
          <tr>
            <th>Trophé</th>
            <th>Date</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(value, i) in player.trophies" :key="i">
            <td>{{ value.id }}</td>
            <td>{{ getDate(value.date) }}</td>
            <td>{{ value.type }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from "vuex";
import game from "../api-client/game";
export default {
  name: "Profil",
  data() {
    return {
      profilPic: null,
      selectedPic: null,
    };
  },
  computed: {
    ...mapState({
      player: "player",
    }),
    getProfilePic() {
      try {
        require(`../assets/img/${this.player.icon}`);

        if (this.player.icon) {
          return this.player.icon;
        } else {
          return "player.png";
        }
      } catch {
        return "player.png";
      }
    },
  },
  methods: {
    ...mapActions({
      setPlayerIcon: "SET_PLAYER_ICON",
    }),
    setPicture(e, picture) {
      e.preventDefault();
      game.updateIcon(this.player.id, picture).then(
        (res) => {
          console.log("Update icon : " + res.status);
          localStorage.setItem("playerIcon", picture);
          console.log(this.player.icon);
          this.setPlayerIcon(this.player.id);
        },
        (err) => {
          console.log("Update icon : " + err);
        }
      );
    },
    getDate(timestamp) {
      let date = new Date(timestamp);

      return (
        date.getDate() +
        "/" +
        (date.getMonth() + 1) +
        "/" +
        date.getFullYear() +
        " " +
        date.getHours() +
        ":" +
        date.getMinutes() +
        ":" +
        date.getSeconds()
      );
    },
  },
  created() {},
};
</script>

<style scoped>
p {
  color: white;
  font-weight: bolder;
}
img {
  width: 10em;
}
form {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  border: 5px solid white;
  margin-bottom: 5em;
}
form label {
  margin: 0.5em;
  display: flex;
  justify-content: center;
  align-items: center;
}
#icon {
  display: flex;
  flex-direction: column;
  margin-top: 2em;
  justify-content: center;
}
#updateIcon {
  width: 100%;

  border: 3px solid transparent;
  border-radius: 5px;
  padding: 0.5em 0.25em;
  font-weight: bolder;
  margin: 1em 1em;
}
#updateIcon:active {
  border: 3px solid #42b983;
}
#image {
  margin-bottom: 10px;
  width: 15em;
  height: auto;
  display: inline-block;
  border: 5px solid #42b983;
}
#playerId {
  color: #42b983;
}
.img-container {
  display: flex;
  justify-content: center;
}
#listIcon {
  visibility: visible;
}
table.blueTable {
  border: 1px solid #f1f1f1;
  background-color: #ffffff;
  width: 60%;
  text-align: left;
  border-collapse: collapse;
}
table.blueTable td,
table.blueTable th {
  border: 1px solid #aaaaaa;
  padding: 3px 2px;
}
table.blueTable tbody td {
  font-size: 13px;
}
table.blueTable tr:nth-child(even) {
  background: #d0e4f5;
}
table.blueTable thead {
  background: #697884;
  background: -moz-linear-gradient(top, #5592bb 0%, #327cad 66%, #1c6ea4 100%);
  background: -webkit-linear-gradient(
    top,
    #5592bb 0%,
    #327cad 66%,
    #1c6ea4 100%
  );
  background: linear-gradient(to bottom, #5592bb 0%, #327cad 66%, #1c6ea4 100%);
  border-bottom: 2px solid #444444;
}
table.blueTable thead th {
  font-size: 15px;
  font-weight: bold;
  color: #ffffff;
  border-left: 2px solid #d0e4f5;
}
table.blueTable thead th:first-child {
  border-left: none;
}
.table-container {
  display: flex;
  justify-content: center;
}
table.blueTable tfoot {
  font-size: 14px;
  font-weight: bold;
  color: #ffffff;
  background: #d0e4f5;
  background: -moz-linear-gradient(top, #dcebf7 0%, #d4e6f6 66%, #d0e4f5 100%);
  background: -webkit-linear-gradient(
    top,
    #dcebf7 0%,
    #d4e6f6 66%,
    #d0e4f5 100%
  );
  background: linear-gradient(to bottom, #dcebf7 0%, #d4e6f6 66%, #d0e4f5 100%);
  border-top: 2px solid #444444;
}
table.blueTable tfoot td {
  font-size: 14px;
}
table.blueTable tfoot .links {
  text-align: right;
}
table.blueTable tfoot .links a {
  display: inline-block;
  background: #1c6ea4;
  color: #ffffff;
  padding: 2px 8px;
  border-radius: 5px;
}
</style>
