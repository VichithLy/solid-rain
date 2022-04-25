import meteoriteImg from "../assets/logo.png";
import defaultPlayerImg from "../assets/img/player.png";

export default {
  drawMap(L, map) {
    L.tileLayer(
      "https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}@2x.jpg90?access_token=pk.eyJ1IjoibTFpZjEzIiwiYSI6ImNqczBubmhyajFnMnY0YWx4c2FwMmRtbm4ifQ.O6W7HeTW3UvOVgjCiPrdsA",
      {
        maxZoom: 22,
        minZoom: 1,
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
          '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
          'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken:
          "pk.eyJ1IjoibTFpZjEzIiwiYSI6ImNqczBubmhyajFnMnY0YWx4c2FwMmRtbm4ifQ.O6W7HeTW3UvOVgjCiPrdsA",
      }
    ).addTo(map);
  },
  drawZrr(L, zrr, map) {
    if (zrr.length !== 0) {
      const zrrRect = L.rectangle([
        [zrr[0][0], zrr[0][1]],
        [zrr[1][0], zrr[1][1]],
      ]);
      map.addLayer(zrrRect);
    }
  },
  drawPlayer(L, markers, player, map) {
    let playerImg = null;

    try {
      require(`../assets/img/${player.icon}`);
      playerImg = require(`../assets/img/${player.icon}`);
    } catch {
      playerImg = defaultPlayerImg;
    }

    const playerIcon = L.icon({
      iconUrl: playerImg,
      iconSize: [40, 40],
      iconAnchor: [20, 20],
      popupAnchor: [0, -15],
    });

    markers.playerMarker = L.marker([player.position[0], player.position[1]], {
      icon: playerIcon,
    })
      .bindPopup(player.id + " (vous)")
      .addTo(map);
  },
  drawMeteorites(L, markers, meteorites, map) {
    this.deleteMeteoritesMarkers(markers, map);

    const meteoriteIcon = L.icon({
      iconUrl: meteoriteImg,
      iconSize: [40, 40],
      iconAnchor: [20, 20],
      popupAnchor: [0, -15],
    });

    let metMarkers = [];
    meteorites.forEach((meteorite) => {
      markers.meteoritesMarkers.push({
        id: meteorite.id,
        type: meteorite.type,
        marker: L.marker([meteorite.impact[0], meteorite.impact[1]], {
          icon: meteoriteIcon,
        }),
      });
      metMarkers.push(
        L.marker([meteorite.impact[0], meteorite.impact[1]], {
          icon: meteoriteIcon,
        }).bindPopup(meteorite.type)
      );
    });
    markers.meteoritesLayerGrp = L.layerGroup(metMarkers);
    markers.meteoritesLayerGrp.addTo(map);
  },
  drawPlayers(L, markers, players, map) {
    this.deletePlayersMarkers(markers, map);

    players.forEach((player) => {
      let playerImg = defaultPlayerImg;

      try {
        require(`../assets/img/${player.url}`);
        playerImg = require(`../assets/img/${player.url}`);
      } catch {
        playerImg = defaultPlayerImg;
      }

      const playerIcon = L.icon({
        iconUrl: playerImg,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
        popupAnchor: [0, -15],
      });

      markers.playersMarkers.push(
        L.marker([player.position[0], player.position[1]], {
          icon: playerIcon,
        }).bindPopup(player.id)
      );
    });

    markers.playersLayerGrp = L.layerGroup(markers.playersMarkers);
    markers.playersLayerGrp.addTo(map);
  },
  deleteAllMarkers(markers, map) {
    this.deletePlayerMarker(markers, map);
    this.deletePlayersMarkers(markers, map);
    this.deleteMeteoritesMarkers(markers, map);
    // Delete event handlers
    map.off("click");
    map.off("mouseup");
    map.off("zoomend");
  },
  deletePlayerMarker(markers, map) {
    if (markers.playerMarker !== null) {
      map.removeLayer(markers.playerMarker);
      markers.playerMarker = null;
    }
  },
  deletePlayersMarkers(markers, map) {
    if (markers.playersMarkers.length !== 0) {
      markers.playersMarkers = [];
    }
    if (markers.playersLayerGrp !== null) {
      map.removeLayer(markers.playersLayerGrp);
      markers.playersLayerGrp = null;
    }
  },
  deleteMeteoritesMarkers(markers, map) {
    if (markers.meteoritesMarkers.length !== 0) {
      markers.meteoritesMarkers = [];
    }
    if (markers.meteoritesLayerGrp !== null) {
      map.removeLayer(markers.meteoritesLayerGrp);
      markers.meteoritesLayerGrp = null;
    }
  },
};
