const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token)
    return res.status(401).json({ success: false, message: "Access denied" });
  try {
    const verified = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.SECRET_KEY
    );
    req.user = verified; // Attach user info to request
    next();
  } catch (err) {
    res.status(403).json({ success: false, message: "Invalid token" });
  }
};
module.exports = { authenticateToken };
