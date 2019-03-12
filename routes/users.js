const express = require('express');
const moment = require('moment');
const Workout = require('../models/workout');
const middlewares = require('../middlewares/index');

const router = express.Router();

router.use(middlewares.protectedRoute);

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('home');
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
    time,
    duration,
    comment,
    picture,
  } = req.body;
  const setTime = new Date(`1970-01-01T${time}`);
  const dateTime = new Date(date);
  dateTime.setHours(setTime.getHours());
  dateTime.setMinutes(setTime.getMinutes());
  Workout.create({
    userId: _id,
    activity,
    meetingpoint,
    dateTime,
    duration,
    attendees: _id,
    comment,
    picture,
  })
    .then(() => {
      res.redirect('/user/workouts');
    })
    .catch((error) => {
      next(error);
    });
});
/* GET users workouts listing. */
router.get('/workouts', (req, res, next) => {
  // eslint-disable-next-line no-underscore-dangle
  Workout.find({ attendees: req.session.currentUser._id })
    .then((workouts) => {
      res.render('workouts', { moment, workouts });
    })
    .catch((error) => {
      next(error);
    });
});

/* GET see workout details */

router.get('/workouts/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const workout = await Workout.findById(id);
    res.render('workout', { moment, workout });
  } catch (error) {
    next(error);
  }
});

router.get('/workouts/:id/update', (req, res, next) => {
  const { id } = req.params;
  Workout.findById(id)
    .then((workout) => {
      res.render('update', {
        workout,
      });
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/workouts/:id/update', (req, res, next) => {
  const { id } = req.params;
  const {
    activity,
    meetingpoint,
    date,
    duration,
    comment,
  } = req.body;
  Workout.findByIdAndUpdate(id, {
    activity,
    meetingpoint,
    date,
    duration,
    comment,
  })
    .then(() => {
      res.redirect('/user/workouts');
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/workouts/:id/delete', (req, res, next) => {
  const { id } = req.params;
  Workout.findByIdAndDelete(id)
    .then(() => {
      res.redirect('/user/workouts');
    })
    .catch((error) => {
      next(error);
    });
});

/* Join a workout */

router.post('/workouts/:id/join', (req, res, next) => {
  const attendeeId = req.session.currentUser._id;
  const { id } = req.params;
  Workout.findById(id)
    .then((workout) => {
      // check is attendees alreadt included
      if (!workout.attendees.map(w => w.toHexString()).includes(attendeeId)) {
        workout.attendees.push(attendeeId);
        workout.save();
      }
    })
    .then(() => {
      res.redirect('/user/');
    })
    .catch((error) => {
      next(error);
    });
});
module.exports = router;
