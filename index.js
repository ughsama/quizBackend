const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/routes");

const url_string =
  "mongodb+srv://admin:admin@cluster0.y9p4g.mongodb.net/quiz_app?retryWrites=true&w=majority";

mongoose.connect(url_string, { useNewUrlParser: true }).then(() => {
  console.log("server connected");
  const app = express();
  app.listen(process.env.PORT || 5000);

  app.use(express.json());
  app.use("/api", routes);
  app.get("/", (req, res) => res.json({ ping: true }));
});
