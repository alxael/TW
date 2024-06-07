const mongoose = require("mongoose");
const { Schema } = mongoose;

const contactModel = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  company: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  contactReason: {
    type: String,
    enum: ["Business", "Careers", "Other"],
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model("contact", contactModel);
