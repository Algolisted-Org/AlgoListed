const asyncHandler = require("./asyncHandler");
const jwt = require("jsonwebtoken");
const User = require("../Models/userProfileModel");
const { request } = require("express");

exports.isAuthenticatedUser = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;
  console.log(token);
  if (!token) {
    res.status(401).send("Unauthorized: You do not have access.");
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decodedData.id);
  console.log(user);
  request.user = user;

  next();
});
