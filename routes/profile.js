const express = require('express');
const User = require('../models/user');
const middlewares = require('../middlewares/index');

const router = express.Router();

router.use(middlewares.protectedRoute);

/* GET see profile details */
router.get('/', async (req, res, next) => {
  const { _id } = req.session.currentUser;
  try {
    const user = await User.findById(_id);
    console.log(user);
    res.render('profile', { user });
  } catch (error) {
    next(error);
  }
});

/* UPDATE profile */
router.post('/', (req, res, next) => {
  const { _id } = req.session.currentUser;
  const {
    picture,
    description,
    preferences,
  } = req.body;
  User.findByIdAndUpdate(_id, {
    picture,
    description,
    preferences,
  })
    .then(() => {
      res.redirect('/profile');
    })
    .catch((error) => {
      next(error);
    });
});

/* Delete account */
router.post('/', (req, res, next) => {
  const { id } = req.params;
  User.findByIdAndDelete(id)
    .then(() => {
      res.redirect('/');
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
