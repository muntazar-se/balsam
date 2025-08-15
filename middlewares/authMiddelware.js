const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    console.log("No token provided");
    return res
      .status(401)
      .send({ success: false, message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    console.log("User authenticated:", req.userId);
    next();
  } catch (error) {
    console.log("Invalid token:", error);
    res.status(401).send({ success: false, message: "Invalid token" });
  }
};

module.exports = authMiddleware;
