const mongoose = require('mongoose');

const codingQuestionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  specialTag: {
    type: String,
    required: true,
  },
  tags: [{
    type: String,
    required: true,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  completed: {
    type: Bool,
    default: false,
  },
});

module.exports = mongoose.model('All_Coding_Sheets', codingQuestionSchema);
