const mongoose = require('mongoose');

const resourcesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  mainTag: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  imgLink: {
    type: String,
    required: true,
  },
  promotionLink: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Number,
    default: 0,
  },
  topRated:{
    type: Boolean,
    default: false,
  },
  report_count: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('All_Resources', resourcesSchema);
