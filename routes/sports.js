/* eslint-disable no-underscore-dangle */
const express = require('express');
const moment = require('moment');
const Workout = require('../models/workout');
const User = require('../models/user');
const middlewares = require('../middlewares/index');


const router = express.Router();
router.use(middlewares.protectedRoute);

function sportWorkouts(activity) {
  return async (req, res, next) => {
    try {
      const workouts = await Workout.find({ activity });
      const ownerIds = Array.from(new Set(workouts.map(workout => workout.attendees[0])));
      const owners = await User.find({
        _id: {
          $in: ownerIds,
        },
      });
      const attendeeId = req.session.currentUser._id;
      const ownerPicturesById = {};
      owners.forEach((owner) => {
        ownerPicturesById[owner._id] = owner.picture;
      });
      res.render('sport', {
        moment,
        workouts,
        ownerPicturesById,
        activity,
        attendeeId,
      });
    } catch (error) {
      next(error);
    }
  };
}
/* GET sport page. */
router.get('/basketball', sportWorkouts('Basketball'));
router.get('/biking', sportWorkouts('Biking'));
router.get('/football', sportWorkouts('Football'));
router.get('/running', sportWorkouts('Running'));
router.get('/tennis', sportWorkouts('Tennis'));
router.get('/others', sportWorkouts('Others'));

module.exports = router;
