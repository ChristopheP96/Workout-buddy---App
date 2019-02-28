const express = require('express');
const Workout = require('../models/workout');
const middlewares = require('../middlewares/index');

const router = express.Router();

router.use(middlewares.protectedRoute);

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('home');
});

/* GET users listing. */
router.get('/workouts', (req, res, next) => {
  res.render('workouts');
});

/* GET new workout */
router.get('/workouts/new', (req, res, next) => {
  res.render('new');
});

router.post('/workouts/new', (req, res, next) => {
  const { _id } = req.session.currentUser;
  const {
    userId,
    activity,
    meetingpoint,
    date,
    timeframe,
    attendees,
    comment,
  } = req.body;
  Workout.create({
    userId: _id,
    activity,
    meetingpoint,
    date,
    timeframe,
    attendees,
    comment,
  })
    .then(() => {
      res.redirect('/user/workouts');
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
