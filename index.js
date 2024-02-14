const express = require("express");
var bodyParser = require("body-parser");
const User = require("./models/user");
const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello");
});

User.sync({ force: true });

app.listen(3000, () => {
  console.log("Server running in port 3000");
});
