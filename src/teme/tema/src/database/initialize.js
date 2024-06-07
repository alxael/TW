const bcrypt = require("bcrypt");
const debug = require("debug")("app::initialize");

const initialize = async (userModel) => {
  try {
    const encryptedPassword = await bcrypt.hash(
      process.env.ADMIN_PASSWORD || "password",
      10
    );
    let user = new userModel({
      email: process.env.ADMIN_EMAIL || "admin@admin.com",
      password: encryptedPassword,
      role: "administrator",
    });
    await user.save();
  } catch (err) {
    debug(err);
  }
};

module.exports = initialize;
