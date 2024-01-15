const mongoose = require("mongoose");
const user_schema = new mongoose.Schema(
  {
    username: { type: String },
    userid: { type: Number },
    userpassword: { type: String },
  },
  { timestamp: true }
);
const user = mongoose.model("user", user_schema);
module.exports = user;
