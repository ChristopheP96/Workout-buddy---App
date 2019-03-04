const express = require('express');
const Workout = require('../models/workout');

const router = express.Router();

/* GET sport page. */
router.get('/basketball', (req, res, next) => {
  Workout.find({ activity: "Basketball"})
    .then((workouts) => {
      res.render('sport', {
        workouts,
      });
    })
    .catch((error) => {
      next(error);
    });
});
router.get('/biking', (req, res, next) => {
  Workout.find({ activity: "Biking"})
    .then((workouts) => {
      res.render('sport', {
        workouts,
      });
    })
    .catch((error) => {
      next(error);
    });
});
router.get('/football', (req, res, next) => {
  Workout.find({ activity: "Football"})
    .then((workouts) => {
      res.render('sport', {
        workouts,
      });
    })
    .catch((error) => {
      next(error);
    });
});
router.get('/running', (req, res, next) => {
  Workout.find({ activity: "Running"})
    .then((workouts) => {
      res.render('sport', {
        workouts,
      });
    })
    .catch((error) => {
      next(error);
    });
});
router.get('/tennis', (req, res, next) => {
  Workout.find({ activity: "Tennis"})
    .then((workouts) => {
      res.render('sport', {
        workouts,
      });
    })
    .catch((error) => {
      next(error);
    });
});
router.get('/others', (req, res, next) => {
  Workout.find({ activity: "Others"})
    .then((workouts) => {
      res.render('sport', {
        workouts,
      });
    })
    .catch((error) => {
      next(error);
    });
});
module.exports = router;