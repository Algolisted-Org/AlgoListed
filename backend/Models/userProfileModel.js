const mongoose = require('mongoose');

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
    default: [],     // Default to an empty array
    required: false,
  },
  staredSheetsIds: {
    type: [String], // Array of strings
    default: [],     // Default to an empty array
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

module.exports = mongoose.model('All_Users_Profile', usersProfileSchema);
