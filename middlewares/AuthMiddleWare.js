const jwt = require("jsonwebtoken");
require("dotenv").config();
var keyaccesstoken = process.env.ACCESS_TOKEN_SECRET;
function auth(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ errorMessage: "Unauthorized1" });
    else{
      

    const verified = jwt.verify(token,keyaccesstoken);
    req.id = verified.id;
    next();
  }

   
  } catch (err) {
    console.error(err);
    res.status(401).json({ errorMessage: "Unauthorized2" });
  }
}

module.exports = auth;
