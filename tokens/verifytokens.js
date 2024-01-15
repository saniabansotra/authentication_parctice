const jwt = require("jsonwebtoken");
const verifytoken = (token) => {
  try {
    const result = jwt.verify(token, "secretkey");
    return result;
  } catch (error) {
    return false;
  }
};
module.exports = verifytoken;
