const mongoose = require('mongoose');

const { Schema } = mongoose;

const workoutSchema = new Schema({
  userId: {
    type: Schema.ObjectId,
    ref: 'User',
  },
  activity: { type: String },
  meetingpoint: { type: String, unique: true },
  date: { type: Date },
  duration: { type: Number },
  attendees: [{ type: Schema.ObjectId, ref: 'User' }],
  time: { type: Number },
  comment: { type: String, required: true },

}, { timestamps: true });

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;
