const jwt = require("jsonwebtoken");
const UserRegister = require("../model/userRegister");

// Protect routes...
const protect = async (req, res, next) => {
  let token;
  token = req.cookies.authCookie;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

      req.user = await UserRegister.findById(decoded.userId)
        .select("-password")
        .select("-confirmPassword");
      console.log("req.user", req.user);
      next();
    } catch (error) {
      console.error("JWT verification error:", error);
      res.status(401).json({ error: "Not authorized, invalid token" });
      return;
    }
  } else {
    res.status(401).json({ error: "user not authorized" });
    return;
  }
};

module.exports = { protect };
