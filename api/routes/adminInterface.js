const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const resources = require("../model/init_resources.js");
let game = require("../model/init_game.js");
const Game = require("../model/Game");
const Meteorite = require("../model/Meteorite.js");
const Zrr = require("../model/Zrr.js");
const Trophy = require("../model/Trophy.js");
const GeoResource = require("../model/GeoResource.js");

router.get("/", function (req, res) {
  return res.status(200).send("interfaceAdmin home");
});

/**
 * récupération de la liste de tous les joueurs
 */
router.get("/players", (req, res) => {
  // Check if user is authenticated ???
  res.status(200).json(resources.users);
  return res;
});

/**
 * Récupérer la position d'un joueur
 */
router.get("/:id/position", (req, res) => {
  let id = req.params.id;
  resources.users.map((user) => {
    if (user.id == id) {
      return res.status(200).json(user.position);
    }
  });
  res.status(404).send();
});

/**
 * Récupérer le TTL d'un joueur
 */
router.get("/:id/ttl", (req, res) => {
  let id = req.params.id;
  resources.users.map((user) => {
    if (user.id == id) {
      return res.status(200).json(user.ttl);
    }
  });
  res.status(404).send();
});

/**
 * Récupérer l'état de la partie
 */
router.get("/game", (req, res) => {
  res.status(200).json(game);
  return res;
});

/**
 * Récupérer tout les trophées d'un joueur
 */
router.get("/:id/trophy", (req, res) => {
  let idplayer = req.params.id;
  resources.users.map((user) => {
    if (user.id == idplayer) {
      return res.status(200).json(user.trophies);
    }
  });
});

/**
 * Démarrer la partie
 */
router.post("/start", (req, res) => {
  game.start = true;
  return res.status(204).send("successful operation");
});

/**
 * Arrêter la partie
 */
router.post("/stop", (req, res) => {
  const point_a = [0, 0];
  const point_b = [0, 0];
  game = new Game(false, new Zrr(point_a, point_b));
  resources.meteorites = [];
  resources.users = [];
  return res.status(204).send("successful operation");
});

/**
 * Créer une nouvelle météorite
 */
router.post("/meteorite", (req, res) => {
  let id = Date.now();
  let impact = req.body.impact;
  let type = req.body.type;

  if (impact.length == 0 || type.length == 0) {
    return res.status(400).send("invalid parameter");
  }

  let meteorite = new Meteorite(id, impact, type);
  resources.meteorites.push(meteorite);
  return res.status(204).send();
});

/**
 * Indique quand et par qui une météorite a été récupérée ( getTrophy )
 */
router.post(
  "/user/:userId/meteorite/:meteoriteId/type/:meteoriteType",
  auth,
  (req, res) => {
    let userId = req.params.userId;
    let meteoriteType = req.params.meteoriteType;
    let meteoriteId = req.params.meteoriteId;
    let meteoriteNotFound = false;
    let alreadyTrophy = true;

    resources.meteorites.map((meteorite) => {
      if (meteorite.id == meteoriteId) {
        meteoriteNotFound = true;
      }
    });
    resources.users.map((user) => {
      user.trophies.map((trophies) => {
        if (trophies.id == meteoriteId) {
          alreadyTrophy = false;
        }
      });
    });
    if (alreadyTrophy) {
      resources.users.map((user) => {
        if (user.id === userId && meteoriteNotFound === true) {
          user.trophies.push(
            new Trophy(meteoriteId, Date.now(), meteoriteType)
          );
          return res.status(204).send();
        }
      });
    } else {
      res.status(409).send();
    }
    res.status(404).send();
  }
);

/**
 * Add a new player to our model
 */
router.post("/player", (req, res) => {
  let userid = req.body.id;

  resources.users.map((user) => {
    if (user.id == userid) {
      throw res.status(409).send();
    }
    // CHECK IF USER DOESN'T EXIST
  });

  let position = [45.782, 4.8656]; // Nautibus
  let trophies = [];
  let user = new GeoResource(
    userid,
    "http://example.com/users/user1/avatar.png",
    position,
    "player",
    game.initalTTL,
    trophies
  );
  resources.users.push(user);

  res.status(201).send();
});

/**
 * Fixer le périmètre du jeu ( ZRR )
 */
router.put("/zrr", (req, res) => {
  let requestBody = req.body;
  let point_a_lat = requestBody.point_a[0];
  let point_a_lon = requestBody.point_a[1];
  let point_b_lat = requestBody.point_b[0];
  let point_b_lon = requestBody.point_b[1];

  if (
    point_a_lat == null ||
    point_a_lon == null ||
    point_b_lat == null ||
    point_b_lon == null
  ) {
    return res.status(400).send("Invalid request body");
  }

  let pos_point_a = [point_a_lat, point_a_lon];
  let pos_point_b = [point_b_lat, point_b_lon];
  let newZrr = new Zrr(pos_point_a, pos_point_b);
  game.zrr = newZrr;

  return res.status(204).send();
});

/**
 * Fixer le TTL initial
 */
router.put("/ttl", (req, res) => {
  let initialTTL = req.body.initalTTL;
  if (initialTTL == null) {
    return res.status(400).send("Invalid request body");
  }
  game.initalTTL = initialTTL;
  return res.status(204).send();
});

/**
 * Update la TTL d'un joueur
 */
router.put("/ttl/:idPlayer", (req, res) => {
  let ttl = req.body.ttl;
  let idPlayer = req.params.idPlayer;
  resources.users.map((user) => {
    if (user.id == idPlayer) {
      user.ttl = ttl;
      res.status(204).send();
    } else {
      res.status(404).send();
    }
  });
  return res;
});

module.exports = router;
