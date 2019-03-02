const express = require('express');

const router = express.Router();

/* GET sport page. */
router.get('/basketball', (req, res, next) => {
  res.render('sport');
});
router.get('/biking', (req, res, next) => {
  res.render('sport');
});
router.get('/football', (req, res, next) => {
  res.render('sport');
});
router.get('/running', (req, res, next) => {
  res.render('sport');
});
router.get('/tennis', (req, res, next) => {
  res.render('sport');
});
router.get('/others', (req, res, next) => {
  res.render('sport');
});
module.exports = router;