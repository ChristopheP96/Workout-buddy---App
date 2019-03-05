const express = require('express');
const multer = require('multer');
const User = require('../models/user');
const middlewares = require('../middlewares/index');

const storage = multer.diskStorage({
  destination: './uploads',
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

function fileFilter(req, file, cb) {
  if (file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

const upload = multer({
  storage,
  limit: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter,
});

const router = express.Router();

router.use(middlewares.protectedRoute);

/* GET see profile details */
router.get('/', async (req, res, next) => {
  const {
    _id
  } = req.session.currentUser;
  try {
    const user = await User.findById(_id);
    res.render('profile', {
      user
    });
  } catch (error) {
    next(error);
  }
});

/* UPDATE profile */
router.post('/', upload.single('picture'), (req, res, next) => {
  const {
    _id,
  } = req.session.currentUser;
  const picture = req.file.path;
  const {
    description,
    preferences,
  } = req.body;
  User.findByIdAndUpdate(_id, {
    picture,
    description,
    preferences,
  })
    .then(() => {
      console.log(req.file.path);
      console.log('QDQKDJQDLFQHLDF');
      console.log(picture);
      res.redirect('/profile');
    })
    .catch((error) => {
      next(error);
    });
});

/* Delete account */
router.post('/', (req, res, next) => {
  const {
    id
  } = req.params;
  User.findByIdAndDelete(id)
    .then(() => {
      res.redirect('/');
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
