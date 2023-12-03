const jwt = require("jsonwebtoken");

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "30d",
  });
  res.cookie("authCookie", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

module.exports = { generateToken };
