const express = require('express');

const router = express.Router();

/* GET users listing. */
router.get('/workouts', (req, res, next) => {
  res.render('workouts');
});

module.exports = router;
