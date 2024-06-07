const express = require("express");
const { models, Types } = require("mongoose");
const debug = require("debug")("app:authRouter");
const bcrypt = require("bcrypt");
const { authorizeModerator } = require("../middleware/authenticate");
const { request, response } = require("express");

const authRouter = (userModel) => {
  const router = express.Router();

  router.route("/login").get((request, result) => {
    if (request.session.email) return result.redirect("/admin/main");
    result.render("login");
  });

  router.route("/login").post(async (request, result) => {
    try {
      let user = new userModel(request.body);

      /// Check if input data is valid.
      if (!(user.email && user.password)) {
        result.status(400);
        return result.send("Invalid entry.");
      }

      /// Get existing user's data.
      const existingUser = await userModel.findOne({ email: user.email });

      /// Check if user exists.
      if (!existingUser) {
        result.status("404");
        return result.send("User not found.");
      }

      /// Check if the passwords match.
      if (await bcrypt.compare(user.password, existingUser.password)) {
        request.session.email = user.email;

        result.status(200);
        return result.send("Login successful");
      } else {
        result.status(400);
        return result.send("Invalid credentials.");
      }
    } catch (err) {
      result.status(400);
      debug(err);
    }
  });

  router.route("/logout").post((request, result) => {
    request.session.destroy();
    result.status(200);
    return result.send("Logout successful.");
  });

  return router;
};

module.exports = authRouter;
