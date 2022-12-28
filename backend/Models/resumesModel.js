const mongoose = require('mongoose');

const resumesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  hiringType: {
    type: String,
    required: true,
  },
  hiringDate: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  resume: {
    type: String,
    required: true, 
  },
  linkedin: {
    type: String,
    required: true,
  },
  workExp: {
    type: String,
    required: true, 
  },
  codingProfiles: [{
    type: Array,
    required: true,
  }],
  projects: [{
    type: Array,
    required: true,
  }],
  mentorship: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['SDE Roles', 'UX Developers', 'Indian StartUps', 'Remote StartUps'],
    required: true,
    default: 'SDE Roles',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('All_Resumes', resumesSchema);
