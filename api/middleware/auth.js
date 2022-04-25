const axios = require("axios");
const springServerURL = "http://localhost:8080";

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  const origin = req.headers.origin;

  if (token && origin) {
    axios
      .get(
        springServerURL + "/authenticate?token=" + token + "&origin=" + origin
      )
      .then(() => {
        next();
      })
      .catch(() => {
        // error
        res.status(401).send("User not authenticated");
      });
  } else {
    res.status(400).send("Invalid auth request");
  }
};
