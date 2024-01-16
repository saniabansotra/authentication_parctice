const mongoose = require("mongoose");
const user_schema = new mongoose.Schema(
  {
    username: { type: String },
    userid: { type: Number },
    userpassword: { type: String },
  },
  { timestamp: true }
);
const appuser = mongoose.model("appuser", user_schema);
module.exports = appuser;
