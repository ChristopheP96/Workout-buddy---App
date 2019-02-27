const express = require('express');
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

module.exports = router;
