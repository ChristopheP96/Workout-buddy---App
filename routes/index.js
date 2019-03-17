const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const router = express.Router();

/* GET front page. */
router.get('/', (req, res, next) => {
  res.render('front', { layout: false });
});
// login in front page
router.post('/', (req, res, next) => {
  const { username, password } = req.body;
  User.findOne({ username })
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        // Save the login in the session!
        req.session.currentUser = user;
        res.redirect('/user');
      } else {
        req.flash('danger', 'The username or the password is incorrect.');
        res.redirect('/');
      }
    })
    .catch((error) => {
      next(error);
    });
});

/* GET singup page. */

router.get('/signup', (req, res, next) => {
  res.render('signup');
});

router.post('/signup', (req, res, next) => {
  const {
    name, email, username, password,
  } = req.body;
  const bcryptSalt = 10;
  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);
  if (username === '' || password === '' || name === '' || email === '') {
    req.flash('danger', 'All fields are required to sign up');
    res.redirect('/signup');
  }
  User.findOne({ username })
    .then((user) => {
      if (user !== null) {
        req.flash('danger', 'The username already exists!');
        res.redirect('/signup');
      } else {
        User.create({
          name,
          email,
          username,
          password: hashPass,
        })
          .then((userCreated) => {
            req.session.currentUser = userCreated;
            res.redirect('/user');
          })
          .catch((error) => {
            next(error);
          });
      }
    });
});

router.get('/logout', (req, res, next) => {
  req.session.destroy(() => {
    res.redirect('/user');
  });
});

module.exports = router;
