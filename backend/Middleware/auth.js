const asyncHandler = require("./asyncHandler");
const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");
const UserProfile = require("../Models/userProfileModel");

exports.isAuthenticatedUser = asyncHandler(async (req, res, next) => {
  const cookieToken = req.cookies && req.cookies.token;
  const bearerToken =
    req.headers.authorization && req.headers.authorization.startsWith("Bearer ")
      ? req.headers.authorization.split(" ")[1]
      : null;
  const token = cookieToken || bearerToken;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: You do not have access." });
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  const user =
    (await User.findById(decodedData.id)) ||
    (await UserProfile.findById(decodedData.id));
  if (!user) {
    return res.status(401).json({ message: "Unauthorized: User not found." });
  }

  req.user = user;

  next();
});
