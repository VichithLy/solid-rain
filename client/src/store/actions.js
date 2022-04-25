import game from "../api-client/game";
import {
  RESET_STATE,
  SET_CURRENT_TTL,
  SET_METEORITES,
  SET_PLAYER_ICON,
  SET_PLAYER_ID,
  SET_PLAYER_POSITION,
  SET_PLAYER_TROPHY,
  SET_PLAYER_TTL,
  SET_PLAYERS,
  SET_TTL_CREATION,
  SET_ZRR,
  SET_AUTHENTICATED,
  SET_GAME_STATUS,
} from "./mutation-types";

export const actions = {
  [SET_AUTHENTICATED]: ({ commit }, status) => {
    commit(SET_AUTHENTICATED, status);
  },
  [SET_GAME_STATUS]: ({ commit }) => {
    game
      .getGameStatus()
      .then((res) => {
        commit(SET_GAME_STATUS, res);
      })
      .catch(() => {
        console.log("ERROR SET_GAME_STATUS");
      });
  },
  [SET_ZRR]: ({ commit }) => {
    game
      .getZrr()
      .then((res) => {
        commit(SET_ZRR, res);
      })
      .catch(() => {
        console.log("ERROR SET_ZRR");
      });
  },
  [SET_PLAYER_ID]: ({ commit }, playerId) => {
    game
      .getOnePlayer(playerId)
      .then((res) => {
        commit(SET_PLAYER_ID, res.id);
      })
      .catch(() => {
        console.log("ERROR SET_PLAYER_ID");
      });
  },
  [SET_PLAYER_POSITION]: ({ commit }, pos) => {
    commit(SET_PLAYER_POSITION, pos);
  },
  [SET_PLAYER_TTL]: ({ commit }, playerId) => {
    game
      .getPlayerTTL(playerId)
      .then((res) => {
        commit(SET_PLAYER_TTL, res);
      })
      .catch(() => {
        console.log("ERROR SET_PLAYER_TTL");
      });
  },
  [SET_TTL_CREATION]: ({ commit }, date) => commit(SET_TTL_CREATION, date),
  [SET_CURRENT_TTL]: ({ commit }, ttl) => commit(SET_CURRENT_TTL, ttl),
  [SET_PLAYER_ICON]: ({ commit }, playerId) => {
    game
      .getPlayerIcon(playerId)
      .then((res) => {
        commit(SET_PLAYER_ICON, res);
      })
      .catch(() => {
        console.log("ERROR SET_PLAYER_ICON");
      });
  },
  [SET_METEORITES]: ({ commit }) => {
    game
      .getAllMeteorites()
      .then((res) => {
        commit(SET_METEORITES, res);
      })
      .catch(() => {
        console.log("ERROR SET_METEORITES");
      });
  },
  [SET_PLAYERS]: ({ commit }) => {
    game
      .getAllPlayers()
      .then((res) => {
        commit(SET_PLAYERS, res);
      })
      .catch(() => {
        console.log("ERROR SET_PLAYERS");
      });
  },
  [RESET_STATE]: ({ commit }) => {
    commit(RESET_STATE);
  },
  [SET_PLAYER_TROPHY]: ({ commit }, playerID) => {
    game
      .getPlayerTrophies(playerID)
      .then((res) => {
        commit(SET_PLAYER_TROPHY, res);
      })
      .catch(() => {
        console.log("ERROR SET_PLAYER_TROPHY");
      });
  },
};
