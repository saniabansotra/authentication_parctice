const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
const cookies = require("cookie-parser");
const generatetoken = require("./tokens/generatetoken");
const verifytoken = require("./tokens/verifytokens");
const jwt = require("jsonwebtoken");

app.use(cookies());
const { connectDatabase } = require("./connection/connect");
const USERS_MODEL = require("./model/usermodel");
app.post("/signup", async (req, res) => {
  try {
    const newuser = {
      email: req.body.email.toLowerCase(),
      username: req.body.username,
      userid: req.body.userid,
      userpassword: req.body.userpassword,
    };
    let checkemail = await USERS_MODEL.findOne({
      email: req.body.email.toLowerCase(),
    });
    console.log(checkemail);
    if (!checkemail) {
      const clients = new USERS_MODEL(newuser);
      await clients.save();
      return res.json({ success: true, message: "Data Saved successfully" });
    } else {
      return res.json({ success: false, message: "User already" });
    }
  } catch (error) {
    return res.json({ success: false, error: error.message });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    console.log(req.body);

    // const check_name = USERS_MODEL.findOne({ username: username });
    // const check_password = USERS_MODEL.findOne({
    //   userpassword: userpassword,
    // });
    const checkuser = await USERS_MODEL.findOne({
      email: req.body.email.toLowerCase(),
      // userpassword,
    });

    // if (check_password && check_name)
    console.log(checkuser.userpassword);

    if (req.body.userpassword === checkuser.userpassword) {
      const u_id = checkuser.userid;

      const token = generatetoken(u_id);
      console.log(token);
      res.cookie("web_tk", token);
      return res.json({
        success: true,
        message: "cookie generated successfully",
      });
    } else {
      return res.json({ success: false, message: "Incorrect Password" });
    }
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
});

const middleware = (req, res, next) => {
  if (verifytoken(req.cookies.web_tk)) {
    const userinfo = verifytoken(req.cookies.web_tk);
    console.log(userinfo);
    next();
  }
};
app.get("/getdata", middleware, (req, res) => {
  try {
    return res.json({ success: true, message: "fully authorized" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
});
connectDatabase();
app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
