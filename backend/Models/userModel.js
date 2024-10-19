const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");

const usersSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  }
});

usersSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('All_Users', usersSchema);
