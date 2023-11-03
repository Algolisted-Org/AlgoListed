const UsersModel = require("../../Models/userProfileModel");
const sendToken = require("../../Utils/jwtToken");

const createUserProfile = async (req, res) => {
  const { email, displayName, photoURL } = req.body;

  try {
    // Check if the email already exists in the collection
    // console.log(ema)
    const existingUser = await UsersModel.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists." });
    }

    // If the email doesn't exist, create a new user profile
    const newUser = await UsersModel.create({
      email,
      name: displayName,
      profilePictureURL: photoURL,
    });

    sendToken(newUser, 201, res);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

const updateUserProfile = async (req, res) => {
  const {
    ownerId,
    name,
    profilePictureURL,
    createdSheetsIds,
    staredSheetsIds,
    twitter,
    instagram,
    linkedin,
    youtube,
    github,
  } = req.body;
  console.log(req.body);
  try {
    // Check if the user with the provided id exists
    console.log(ownerId);
    const existingUser = await UsersModel.findById(ownerId);

    console.log("existingUser : ", existingUser);



    if (!existingUser) {
      return res.status(404).json({ message: "User not found." });
    }

    // Update the user's profile fields based on what's provided in the request
    if (name) existingUser.name = name;
    if (profilePictureURL) existingUser.profilePictureURL = profilePictureURL;
    if (createdSheetsIds) existingUser.createdSheetsIds = createdSheetsIds;
    if (staredSheetsIds) existingUser.staredSheetsIds = staredSheetsIds;
    if (twitter) existingUser.twitter = twitter;
    if (instagram) existingUser.instagram = instagram;
    if (linkedin) existingUser.linkedin = linkedin;
    if (youtube) existingUser.youtube = youtube;
    if (github) existingUser.github = github;

    // Save the updated profile
    await existingUser.save();

    sendToken(existingUser, 201, res);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

const updateUserProfileByEmail = async (req, res) => {
  const {
    email,
    name,
    profilePictureURL,
    createdSheetsIds,
    staredSheetsIds,
    twitter,
    instagram,
    linkedin,
    youtube,
    github,
  } = req.body;
  console.log(req.body);
  try {
    // Check if the user with the provided email exists
    const existingUser = await UsersModel.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found." });
    }

    // Update the user's profile fields based on what's provided in the request
    if (name) existingUser.name = name;
    if (profilePictureURL) existingUser.profilePictureURL = profilePictureURL;
    if (createdSheetsIds) existingUser.createdSheetsIds = createdSheetsIds;
    if (staredSheetsIds) existingUser.staredSheetsIds = staredSheetsIds;
    if (twitter) existingUser.twitter = twitter;
    if (instagram) existingUser.instagram = instagram;
    if (linkedin) existingUser.linkedin = linkedin;
    if (youtube) existingUser.youtube = youtube;
    if (github) existingUser.github = github;

    // Save the updated profile
    await existingUser.save();

    sendToken(existingUser, 201, res);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Something went wrong!" });
  }
};


const getUserProfile = async (ownerId, res) => {
  try {
    console.log("ownerId : ", ownerId);
    const user = await UsersModel.findById(ownerId);
    console.log(user);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    sendToken(user, 201, res);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

module.exports = { createUserProfile, updateUserProfile, updateUserProfileByEmail, getUserProfile };
