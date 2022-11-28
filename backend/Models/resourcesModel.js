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
  tags: {
    type: Array,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['Blog', 'PDF', 'Question Paper', 'other'],
    required: true,
    default: 'PDF',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('All_Resources', resourcesSchema);
