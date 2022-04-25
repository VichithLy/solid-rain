import {
  SET_ZRR,
  SET_PLAYER_ID,
  SET_PLAYER_POSITION,
  SET_PLAYER_TTL,
  SET_PLAYER_ICON,
  SET_METEORITES,
  SET_PLAYERS,
  SET_TTL_CREATION,
  SET_CURRENT_TTL,
  RESET_STATE,
  SET_PLAYER_TROPHY,
  SET_AUTHENTICATED,
  SET_GAME_STATUS,
} from "./mutation-types";
import { defaultState } from "../store";

export const mutations = {
  [SET_AUTHENTICATED]: (state, status) => (state.authenticated = status),
  [SET_GAME_STATUS]: (state, status) => (state.gameStatus = status),
  [SET_ZRR]: (state, zrr) => (state.zrr = zrr),
  [SET_PLAYER_ID]: (state, id) => (state.player.id = id),
  [SET_PLAYER_POSITION]: (state, pos) => (state.player.position = pos),
  [SET_PLAYER_TTL]: (state, ttl) => (state.player.ttl = ttl),
  [SET_TTL_CREATION]: (state, date) =>
    (state.player.ttl_creation_timestamp = date),
  [SET_CURRENT_TTL]: (state, ttl) => (state.player.current_ttl = ttl),
  [SET_PLAYER_ICON]: (state, icon) => (state.player.icon = icon),
  [SET_METEORITES]: (state, meteorites) => (state.meteorites = meteorites),
  [SET_PLAYERS]: (state, players) => (state.players = players),
  [RESET_STATE]: (state) => Object.assign(state, defaultState()),
  [SET_PLAYER_TROPHY]: (state, trophies) => (state.player.trophies = trophies),
};
