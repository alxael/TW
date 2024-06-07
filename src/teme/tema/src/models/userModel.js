const mongoose = require("mongoose");
const { Schema } = mongoose;

const userModel = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["administrator", "moderator", "client"],
    default: "client",
  },
});

module.exports = mongoose.model("user", userModel);
