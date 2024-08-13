const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ message: "Unauthorized request" });
    }
    if (jwt.verify(token, process.env.ACCESS_TOKEN_SCERET)) {
      next();
    }
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Invalid token or Token Not Found" });
  }
};

module.exports = verifyToken;
