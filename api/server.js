// load up the express
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const gameManagement = require("./routes/gameManagement.js");
const interfaceAdmin = require("./routes/adminInterface.js");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = 3000;

app.use("/api", gameManagement);
app.use("/admin", interfaceAdmin);

app.use("/static", express.static("./public"));

app.get("/", (req, res) => {
  res.send("/api Express server");
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

app.use(function (req, res) {
  res.status(404).send("Sorry can't find that!");
});
