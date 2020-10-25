require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/routes");
require("dotenv").config();

console.log(process.env);
// const url_string =
//   "mongodb+srv://admin:admin@cluster0.y9p4g.mongodb.net/quiz_app?retryWrites=true&w=majority";

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }).then(() => {
  console.log("server connected");
  const app = express();
  app.listen(process.env.PORT || 5000);

  app.use(express.json());
  app.use("/api", routes);
  app.get("/", (req, res) => res.json({ ping: true }));
});
