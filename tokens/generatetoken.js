const jwt = require("jsonwebtoken");
const generatetoken = (userid) => {
  try {
    const token = jwt.sign({ id: userid }, "secretkey", { expiresIn: "24h" });
    return token;
  } catch (error) {
    console.log(error);
  }
};
module.exports = generatetoken;
