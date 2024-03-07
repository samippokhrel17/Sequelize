const express = require("express");
var bodyParser = require("body-parser");
const app = express();
const userRoute = require("./routes/userRoute");
const { connection } = require("./helpers");

let port = 3000;
app.use(bodyParser.json());

app.use("/", (req, res, next) => {
  return res.send({ message: "welcome to my project" });
});

app.use("/", userRoute);

app.listen(port, () => {
  connection.init();
  console.log(`Server running in port ${port}`);
});
