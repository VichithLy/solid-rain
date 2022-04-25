const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const resources = require("../model/init_resources.js");

router.get("/", function (req, res) {
  res.send("gameManagement home page");
});

/**
 * récupération de la liste complète des objets
 * (autres utilisateurs, impacts) à afficher
 */
router.get("/resources", auth, (req, res) => {
  res.status(200).json(resources).send();
});

/**
 * récupération de la liste de toutes les météorites
 */
router.get("/meteorites", (req, res) => {
  // Check if user is authenticated ???
  res.status(200).json(resources.meteorites);
  return res;
});

/**
 * recuperer un joueur a partir de son ID
 */
router.get("/player/:id", (req, res) => {
  let idPlayer = req.params.id;

  if (resources.users.length === 0) {
    throw res.sendStatus(404);
  }

  let isUserFound = false;

  resources.users.map((user) => {
    if (user.id === idPlayer) {
      //return res.status(200).json(user);
      isUserFound = true;
    }

    if (isUserFound) {
      return res.status(200).json(user);
    }
  });

  return res.status(404).send();
});

/**
 * mise à jour de la position de l'utilisateur
 */
router.put("/resources/:id/position", auth, (req, res) => {
  let id = req.params.id;
  let requestBody = req.body; // bodyParser

  if (
    !Array.isArray(requestBody) ||
    requestBody.length == 0 ||
    requestBody.length == undefined
  ) {
    // if not an array
    return res.status(400).send("Invalid request body");
  }

  // Update position
  resources.users.map((user) => {
    if (user.id == id) {
      let newPosition = requestBody;
      user.position = newPosition;
      return res.status(204).send();
    }
  });

  res.status(404).send();
});

/**
 * mise à jour de l'URL de l'image associée à
 * l'utilisateur (et qui sera géolocalisée sur la carte)
 */
router.put("/resources/:id/image", auth, (req, res) => {
  let id = req.params.id;
  let requestBody = req.body; // bodyParser

  //Invalid URL value
  if (requestBody.url == null) {
    return res.status(400).send("Invalid image URL");
  }

  // Update image url
  resources.users.map((user) => {
    if (user.id == id) {
      // If user exists
      let newURL = requestBody.url;
      user.url = newURL;
      return res.status(204).send();
    }
  });

  res.status(404).send();
});

/**
 * Suppression d'une météortie par son id
 */
router.delete("/meteorite/:id", (req, res) => {
  let id = req.params.id;
  for (let i = 0; i < resources.meteorites.length; i++) {
    if (resources.meteorites[i].id == id) {
      resources.meteorites.splice(i, 1);
      return res.status(204).send();
    } else {
      res.status(404).send();
    }
  }
});

module.exports = router;
