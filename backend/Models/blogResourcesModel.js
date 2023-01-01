const mongoose = require('mongoose');

const blogResourcesSchema = new mongoose.Schema({
  resourceName: {
    type: String,
    required: true,
  },
  resourceLink: {
    type: String,
    required: true,
  },
  specialTag: {
    type: String,
    required: true,
  },
  tags: [{
    type: Array,
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
  blogDomain:{
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('All_Blog_Resources', blogResourcesSchema);
