const express = require("express");
const app = express();
app.use(express.json());
const cookies = require("cookie-parser");
const generatetoken = require("./tokens/generatetoken");
app.use(cookies());
app.post("/api/login", (req, res) => {
  try {
    const userid = req.body.userid;
    const password = req.body.userpassword;
    if (password === 9090) {
      const token = generatetoken(userid);
      console.log(token);
      res.cookie("web_tk", token);
      return res.json({
        success: true,
        message: "cookie generated successfully",
      });
    } else {
      return res.json({ success: false, message: "unauthorized user" });
    }
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
