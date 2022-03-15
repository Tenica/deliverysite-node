const path = require("path");

const express = require("express");

const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user.js");
const authRoutes = require("./routes/auth");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const errorController = require("./controllers/error");

const MONGODB_URI =
  "mongodb+srv://TenicaTech:CgoiFfWGuqqoaO5N@cluster0.avgh7.mongodb.net/delivery-app";

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: "deliverywebsite",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use("/admin", adminRoutes);
app.use(userRoutes);
app.use("/admin", authRoutes);

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page Not found!" });
});

app.get("/500", errorController.get500);

app.use(errorController.get404);

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    app.listen(4000);
  })
  .catch((err) => {
    console.log(err);
  });
