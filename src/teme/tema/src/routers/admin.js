const express = require("express");
const debug = require("debug")("app:admin");
const { authorizeModerator } = require("../middleware/authenticate");

const adminRouter = () => {
  const router = express.Router();

  router.route("/main").get([authorizeModerator], (request, result) => {
    result.render("admin");
  });
  return router;
};

module.exports = adminRouter;
