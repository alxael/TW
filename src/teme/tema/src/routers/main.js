const express = require("express");

const mainRouter = () => {
  const router = express.Router();

  router.route("/").get((request, result) => {
    result.render("main");
  });

  router.route("/404").get((request, result) => {
    result.status(404);
    if (request.accepts("html")) {
      result.render("404", { url: request.url });
      return;
    }
    if (request.accepts("json")) {
      result.json({ error: "Page not found." });
      return;
    }
    result.type("txt").send("Page not found.");
  });

  return router;
};

module.exports = mainRouter;
