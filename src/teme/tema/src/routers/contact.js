const express = require("express");
const debug = require("debug")("app:contact");
const { authorizeModerator } = require("../middleware/authenticate");

const contactRouter = (contactModel) => {
  const router = express.Router();

  router.route("/createContact").post(async (request, result) => {
    try {
      debug(request.body);
      const contact = new contactModel(request.body);
      await contact.save();
      result.status(200);
      return result.send("Contact created successfully!");
    } catch (err) {
      result.status(400);
      debug(err);
    }
  });

  router
    .route("/readAllContact")
    .get([authorizeModerator], async (request, result) => {
      try {
        const allContact = await contactModel.find({});
        result.status(200);
        return result.send(JSON.stringify(allContact));
      } catch (err) {
        result.status(400);
        debug(err);
      }
    });

  return router;
};

module.exports = contactRouter;
