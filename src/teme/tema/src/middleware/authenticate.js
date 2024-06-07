const debug = require("debug")("app:authenticate");
const path = require("path");
const userModel = require("../models/userModel");

const authorizeModerator = async (request, result, next) => {
  const user = await userModel.findOne({ email: request.session.email });

  if (
    user !== null &&
    (user.role == "moderator" || user.role == "administrator")
  )
    return next();

  result.status(403);
  return result.send("User not authorized.");
};

const authorizeAdministrator = async (request, result, next) => {
  const user = await userModel.findOne({ email: request.session.email });

  if (user !== null && user.role == "moderator") return next();

  result.status(403);
  return result.send("User not authorized.");
};

module.exports = { authorizeModerator, authorizeAdministrator };
