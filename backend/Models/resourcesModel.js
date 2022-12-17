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
  creator: {
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
  type: {
    type: String,
    enum: ['Blog', 'Handwritten Notes', 'Question Paper', 'Course', 'Other'],
    required: true,
    default: 'Other',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Number,
    default: 0,
  },
  report_count: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('All_Resources', resourcesSchema);
