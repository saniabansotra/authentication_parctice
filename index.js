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
const USER_MODEL = require("./model/usermodel");
app.post("/api/userlogin", async (req, res) => {
  try {
    const newuser = {
      username: req.body.username,
      userid: req.body.userid,
      userpassword: req.body.userpassword,
    };
    const user = new USER_MODEL(newuser);
    await user.save();
    return res.json({ success: true, message: "Data Saved successfully" });
  } catch (error) {
    return res.json({ success: false, error: error.message });
  }
});

app.post("/api/login1", (req, res) => {
  try {
    console.log(req.body);
    let userid = req.body.userid;
    if (req.body.password === 9090) {
      const token = generatetoken(userid);
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
    return res.json({ success: true, message: error.message });
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
