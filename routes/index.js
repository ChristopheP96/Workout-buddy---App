const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const router = express.Router();

/* GET front page. */
router.get('/', (req, res, next) => {
  res.render('front', { errorMessage: undefined, layout: false });
});
// login in front page
router.post('/', (req, res, next) => {
  const { username, password } = req.body;
  User.findOne({ "username": username })
    .then((user) => {
      if (!user) {
        res.render('front', {
          errorMessage: 'The username or the password is incorrect.',
        });
        return;
      }
      if (bcrypt.compareSync(password, user.password)) {
        // Save the login in the session!
        req.session.currentUser = user;
        res.redirect('/user');
      } else {
        res.render('front', {
          errorMessage: 'The username or the password is incorrect.',
        });
      }
    })
    .catch((error) => {
      next(error);
    });
});

/* GET singup page. */

router.get('/signup', (req, res, next) => {
  res.render('signup', { errorMessage: req.flash('error') });
});

router.post('/signup', (req, res, next) => {
  const {
    name, email, username, password,
  } = req.body;
  const defaultPicture = 'default-picture.jpg';
  const bcryptSalt = 10;
  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);
  if (username === '' && password === '' && name === '' && email === '') {
    res.render('signup', {
      errorMessage: 'All fields are required to sign up',
    });
    return;
  }
  User.findOne({ "username": username })
    .then((user) => {
      if (user !== null) {
        res.render('signup', {
          errorMessage: 'The username already exists!',
        });
      } else {
        User.create({
          name,
          email,
          username,
          password: hashPass,
          picture: defaultPicture,
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
  req.session.destroy((err) => {
    res.redirect('/user');
  });
});

module.exports = router;
