const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const usersProfileSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  profilePictureURL: {
    type: String,
    required: true,
  },
  createdSheetsIds: {
    type: [String], // Array of strings
    default: [], // Default to an empty array
    required: false,
  },
  staredSheetsIds: {
    type: [String], // Array of strings
    default: [], // Default to an empty array
    required: false,
  },
  twitter: {
    type: String,
    required: false,
    default: "",
  },
  instagram: {
    type: String,
    required: false,
    default: "",
  },
  linkedin: {
    type: String,
    required: false,
    default: "",
  },
  youtube: {
    type: String,
    required: false,
    default: "",
  },
  github: {
    type: String,
    required: false,
    default: "",
  },
});
usersProfileSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

module.exports = mongoose.model("All_Users_Profile", usersProfileSchema);
