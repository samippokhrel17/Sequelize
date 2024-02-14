const express = require("express");
var bodyParser = require("body-parser");
const app = express();
const { mysqlHelper } = require("./helpers");

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(3000, () => {
  mysqlHelper.connect();
  console.log("Server running in port 3000");
});
