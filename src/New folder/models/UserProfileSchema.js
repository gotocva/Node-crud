const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
  age: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    required: false
  },
  image: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  status: {
    type: Number,
    default: 1
  }
}, { versionKey: false });


module.exports = mongoose.model('UserProfile', UserSchema);
