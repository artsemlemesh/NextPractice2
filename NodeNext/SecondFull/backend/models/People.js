const mongoose = require('mongoose');

const peopleSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const People = mongoose.model('People', peopleSchema);

module.exports = People;
