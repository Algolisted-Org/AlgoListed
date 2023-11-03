const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const createdProblemSheetsSchema = new mongoose.Schema({
  sheetId: {
    type: String,
    required: false,
  },
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: "All_Users_Profile",
    required: true,
  },
  sheetName: {
    type: String,
    required: true,
  },
  sheetDesc: {
    type: String,
    required: true,
  },
  lastUpdated: {
    type: Date,
    required: true,
  },
  problemIds: {
    type: [String], // Array of strings
    default: [], // Default to an empty array
    required: false,
  },
  countViews: {
    type: Number,
    required: false,
    default: 0,
  },
  countStars: {
    type: Number,
    required: false,
    default: 0,
  },
});

module.exports = mongoose.model(
  "Sheets_Created_by_Users",
  createdProblemSheetsSchema
);
