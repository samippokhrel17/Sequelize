const express = require("express");
var bodyParser = require("body-parser");
const app = express();
const userRoute = require("./routes/userRoute");
const { connection } = require("./helpers");

app.use(bodyParser.json());

app.use("/", userRoute);

app.listen(3000, () => {
  connection.init();
  console.log("Server running in port 3000");
});
