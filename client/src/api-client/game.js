const expressAPI = "http://localhost:3000";

export default {
  async getGameStatus() {
    const res = await fetch(expressAPI + "/admin/game");
    const data = await res.json();
    const status = data.start;

    return status;
  },
  async getZrr() {
    const res = await fetch(expressAPI + "/admin/game");
    const data = await res.json();

    const x0 = data.zrr.point_a[0];
    const x1 = data.zrr.point_a[1];
    const y0 = data.zrr.point_b[0];
    const y1 = data.zrr.point_b[1];

    const zrr = [
      [x0, x1],
      [y0, y1],
    ];
    return zrr;
  },
  async getAllPlayers() {
    const res = await fetch(expressAPI + `/admin/players`);
    let data = await res.json();

    return data;
  },
  async getOnePlayer(playerId) {
    const res = await fetch(expressAPI + `/api/player/${playerId}`);
    let data = await res.json();

    return data;
  },
  async getPlayerById(playerId) {
    const res = await fetch(expressAPI + `/api/player/${playerId}`);

    return res;
  },
  async getPlayerPos(playerId) {
    const res = await fetch(expressAPI + `/admin/${playerId}/position`);
    const data = await res.json();

    return data;
  },
  setPlayerPos(playerId, pos) {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(pos),
    };

    fetch(
      expressAPI + `/api/resources/${playerId}/position`,
      requestOptions
    ).then(
      (res) => {
        console.log("Update player position : " + res.status);
      },
      (err) => {
        console.warn(err);
      }
    );
  },
  async addTrophy(playerID, meteoriteID, meteoriteType) {
    const requestOptions = {
      method: "POST",
      Authorization: localStorage.getItem("token"),
    };
    const res = await fetch(
      expressAPI +
        `/admin/user/${playerID}/meteorite/${meteoriteID}/type/${meteoriteType}`,
      requestOptions
    );

    return res;
  },
  async getPlayerTrophies(playerID) {
    const res = await fetch(expressAPI + `/admin/${playerID}/trophy`);
    const data = await res.json();

    return data;
  },
  async getPlayerTTL(playerId) {
    const res = await fetch(expressAPI + `/admin/${playerId}/ttl`);
    const data = await res.json();

    return data;
  },
  async updateIcon(playerId, newIcon) {
    let data = '{ "url" : "' + newIcon + '" }';
    let json = JSON.parse(data);
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(json),
    };

    const res = await fetch(
      expressAPI + `/api/resources/${playerId}/image`,
      requestOptions
    );

    return res;
  },
  setPlayerTTL(playerId, ttl) {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ttl),
    };
    fetch(expressAPI + `/admin/ttl/${playerId}`, requestOptions).then(
      (res) => {
        console.log("Update player TTL : " + res.status);
      },
      (err) => {
        console.warn(err);
      }
    );
  },
  async getPlayerIcon(playerId) {
    const res = await fetch(expressAPI + `/api/player/${playerId}`);
    let data = await res.json();

    return data.url;
  },
  async getAllMeteorites() {
    const res = await fetch(expressAPI + `/api/meteorites`);
    const data = await res.json();

    return data;
  },
  async deleteMeteorite(id) {
    const requestOptions = { method: "DELETE" };
    const res = await fetch(
      expressAPI + `/api/meteorite/${id}`,
      requestOptions
    );
    return res;
  },
};
