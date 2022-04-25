import { GET_CURRENT_TTL } from "./mutation-types";

export const getters = {
  [GET_CURRENT_TTL]: (state) => {
    const ttl = state.player.ttl;
    const ttlCreation = Math.round(state.player.ttl_creation_timestamp / 1000);
    const currentDate = Math.round(Date.now() / 1000);
    const currentTTL = ttl - (currentDate - ttlCreation);

    return currentTTL > 0 ? currentTTL : 0;
  },
};
