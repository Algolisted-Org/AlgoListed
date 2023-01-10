const mongoose = require('mongoose');

const newCodingQuestionSchema = new mongoose.Schema({
  quesName: {
    type: String,
    required: true,
  },
  quesLink: {
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
    type: Boolean,
    default: false,
  },
  marked: {
    type: Boolean,
    default: false,
  },
  connectOn:{
    type: String,
    required: true,
  },
  connectOnDomain:{
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('All_Coding_Questions', newCodingQuestionSchema);
