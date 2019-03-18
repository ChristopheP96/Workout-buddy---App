const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  picture: { type: String },
  description: { type: String },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
