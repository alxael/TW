const express = require("express");
const morgan = require("morgan");
const chalk = require("chalk");
const debug = require("debug")("app:run");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const session = require("express-session");
const mongoStore = require("connect-mongo");

dotenv.config();
const port = process.env.PORT || 8080;
const mongoConnection =
  process.env.DATABASE_CONNECTION || "mongodb://admin:admin@127.0.0.1:27017";

const app = express();
const databse = mongoose.connect(mongoConnection);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static(path.join(__dirname, "/public/")));
app.use(
  session({
    secret: process.env.TOKEN,
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 28800000 },
    store: mongoStore.create({
      mongoUrl:
        process.env.DATABASE_CONNECTION ||
        "mongodb://admin:admin@127.0.0.1:27017",
    }),
  })
);

app.set("views", "./src/views");
app.set("view engine", "ejs");

const userModel = require("./src/models/userModel");
const contactModel = require("./src/models/contactModel");

const initialize = require("./src/database/initialize");
initialize(userModel);

const mainRouter = require("./src/routers/main")();
const authRouter = require("./src/routers/auth")(userModel);
const adminRouter = require("./src/routers/admin")();
const contactRouter = require("./src/routers/contact")(contactModel);

app.use("/", mainRouter);
app.use("/auth", authRouter);
app.use("/admin", adminRouter);
app.use("/contact", contactRouter);

app.get("*", (request, result) => {
  result.redirect("/404");
});

app.listen(port, () => {
  debug(`App listening on port ${chalk.green(port)}`);
});
