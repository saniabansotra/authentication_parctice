const mongoose = require("mongoose");
const user_schema = new mongoose.Schema(
  {
    email: { type: String },
    username: { type: String },
    userid: { type: Number },
    userpassword: { type: String },
  },
  { timestamp: true }
);
const appuser = mongoose.model("appuser", user_schema);
module.exports = appuser;
