const jwt = require("jsonwebtoken");
const { response } = require("../controller/helper");
const verifyToken = (req, res, next) => {
  const tokenToVerify = req.headers["token"];

  if (!tokenToVerify) {
    return res
      .status(403)
      .send({ ...response, global_error: "No token provided!" });
  }

  jwt.verify(tokenToVerify, process.env.SECRETE_KEY, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .send({ ...response, global_error: "Your session exprired" });
    }
    next();
  });
};

module.exports = verifyToken;
