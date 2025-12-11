const jwt = require("jsonwebtoken");

// use env var if present, else fallback
const JWT_SECRET = process.env.JWT_SECRET || "replace_this_with_a_secure_secret";

module.exports = function (req, res, next) {
  const authHeader = req.header("Authorization") || req.header("authorization");
  if (!authHeader) return res.status(401).json({ msg: "No token, authorization denied" });

  // header must be "Bearer <token>"
  const parts = authHeader.split(" ");
  const token = parts.length === 2 ? parts[1] : authHeader;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // attach user payload to request
    req.user = { id: decoded.id, email: decoded.email, name: decoded.name };
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Token is not valid" });
  }
};
