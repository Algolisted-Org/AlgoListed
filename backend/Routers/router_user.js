const express = require("express");
const router = express.Router();
const { isAuthenticatedUser } = require("../Middleware/auth");
const updateProfile = require("../Controllers/userprofile/profile");

// Get Routes ------->

router.get("/", (req, res) => {
  res.json("You are at the user detail route");
});

router.get("/profile-details", async (req, res) => {
  const { ownerId } = req.query;
  console.log(ownerId);
  updateProfile.getUserProfile(ownerId, res);
  // rest of your code
});

// Post Routes ------->

router.post("/profile-create", (req, res) => {
  updateProfile.createUserProfile(req, res);
});

router.post("/profile-update", (req, res) => {
  updateProfile.updateUserProfile(req, res);
});

router.post("/profile-update-email", (req, res) => {
  updateProfile.updateUserProfileByEmail(req, res);
});

module.exports = router;
