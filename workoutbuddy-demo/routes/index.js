const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const router = express.Router();

/* GET front page. */
router.get('/', (req, res, next) => {
  res.render('front', { errorMessage: undefined, layout: false });
});

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
  res.render('signup');
});

router.post('/signup', (req, res, next) => {
  const {
    name, email, username, password,
  } = req.body;
  const { defaultPicture } = '/uploads/default-picture.jpeg';
  const bcryptSalt = 10;
  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);
  if (username === '' && password === '' && name === '' && email === '') {
    req.flash('error', 'All fields are required to sign up');
    res.render('signup');
    return;
  }
  User.findOne({ username })
    .then((user) => {
      if (user !== null) {
        res.render('signup', {
          errorMessage: 'The username already exists!',
        });
      }
    });
  User.create({
    name,
    email,
    username,
    password: hashPass,
    picture: defaultPicture,
  })
    .then(() => {
      res.redirect('/user');
    })
    .catch((error) => {
      next(error);
    });
});

/* GET login page. */
router.get('/login', (req, res, next) => {
  res.render('login');
});

router.post('/login', (req, res, next) => {
  const { username, password } = req.body;

  if (username === '' || password === '') {
    res.render('login', {
      errorMessage: 'Please enter both, username and password to sign up.',
    });
    return;
  }

  User.findOne({ username })
    .then((user) => {
      if (!user) {
        res.render('login', {
          errorMessage: 'The username or the password is incorrect.',
        });
        return;
      }
      if (bcrypt.compareSync(password, user.password)) {
        // Save the login in the session!
        req.session.currentUser = user;
        res.redirect('/user');
      } else {
        res.render('login', {
          errorMessage: 'The username or the password is incorrect.',
        });
      }
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/logout', (req, res, next) => {
  req.session.destroy(() => {
    res.redirect('/user');
  });
});

module.exports = router;
