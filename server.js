const express = require("express");
const mongoose = require("mongoose");
const carGameRouter = require("./routes/cargame");
const app = express();

mongoose.connect("mongodb://localhost/cargame", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.get("/", ( res) => {
  res.render("index");
});

app.use(carGameRouter);

app.listen(5000);
