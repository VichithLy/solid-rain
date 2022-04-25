import { createStore } from "vuex";
import { map } from "./modules/map";
import { getters } from "./getters";
import { actions } from "./actions";
import { mutations } from "./mutations";

const defaultState = () => {
  return {
    authenticated: localStorage.getItem("token") !== null,
    gameStatus:
      JSON.parse(localStorage.getItem("gameStatus")) !== null
        ? JSON.parse(localStorage.getItem("gameStatus"))
        : false,
    zrr:
      JSON.parse(localStorage.getItem("zrr")) !== null
        ? JSON.parse(localStorage.getItem("zrr"))
        : [],
    player: {
      id:
        localStorage.getItem("playerId") !== null
          ? localStorage.getItem("playerId")
          : null,
      icon:
        localStorage.getItem("playerIcon") !== null
          ? localStorage.getItem("playerIcon")
          : null,
      position:
        localStorage.getItem("playerPos") !== null
          ? JSON.parse(localStorage.getItem("playerPos"))
          : [],
      ttl:
        localStorage.getItem("currentTTL") !== null
          ? JSON.parse(localStorage.getItem("currentTTL"))
          : null,
      ttl_creation_timestamp:
        localStorage.getItem("timestampTTL") !== null
          ? JSON.parse(localStorage.getItem("timestampTTL"))
          : null,
      current_ttl: null,
      trophies: [],
    },
    players: [],
    meteorites: [],
  };
};
const store = createStore({
  state() {
    return defaultState();
  },
  getters,
  mutations,
  actions,
  modules: {
    map,
  },
});

export { store, defaultState };
