import {
  SET_MYMAP,
  GET_MYMAP,
  SET_CURRENT_LAT,
  SET_CURRENT_LNG,
  SET_CURRENT_ZOOM,
  GET_CURRENT_LAT,
  GET_CURRENT_LNG,
  GET_CURRENT_ZOOM,
} from "../mutation-types";

export const map = {
  state() {
    return {
      mymap: {},
      currentLat: 45.78207,
      currentLng: 4.8656,
      currentZoom: 19,
      roger: "test",
    };
  },
  getters: {
    [GET_MYMAP]: (state) => state.mymap,
    [GET_CURRENT_LAT]: (state) => state.currentLat,
    [GET_CURRENT_LNG]: (state) => state.currentLng,
    [GET_CURRENT_ZOOM]: (state) => state.currentZoom,
  },
  mutations: {
    [SET_MYMAP]: (state, map) => (state.mymap = map),
    [SET_CURRENT_LAT]: (state, lat) => (state.currentLat = lat),
    [SET_CURRENT_LNG]: (state, lng) => (state.currentLng = lng),
    [SET_CURRENT_ZOOM]: (state, zoom) => (state.currentZoom = zoom),
  },
  actions: {
    [SET_MYMAP]: ({ commit }, map) => commit(SET_MYMAP, map),
    [SET_CURRENT_LAT]: ({ commit }, lat) => commit(SET_CURRENT_LAT, lat),
    [SET_CURRENT_LNG]: ({ commit }, lng) => commit(SET_CURRENT_LNG, lng),
    [SET_CURRENT_ZOOM]: ({ commit }, zoom) => commit(SET_CURRENT_ZOOM, zoom),
  },
};
