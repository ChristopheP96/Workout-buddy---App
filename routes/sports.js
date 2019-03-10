const express = require('express');
const moment = require('moment');
const Workout = require('../models/workout');
const middlewares = require('../middlewares/index');


const router = express.Router();
router.use(middlewares.protectedRoute);

function sportWorkouts(activity) {
  return (req, res, next) => {
    const { _id } = req.session.currentUser;
    Workout.find({ activity })
      .then((workouts) => {
        res.render('sport', {
          userId: _id,
          moment,
          workouts,
          activity,
        });
      })
      .catch((error) => {
        next(error);
      });
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
