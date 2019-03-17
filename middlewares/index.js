module.exports = {
  protectedRoute: (req, res, next) => {
    if (req.session.currentUser) {
      next();
    } else {
      res.redirect('/');
    }
  },
  anonRoute: (req, res, next) => {
    if (req.session.currentUser) {
      res.redirect('/');
    } else {
      next();
    }
  },
  checkRole: role => (req, res, next) => {
    if (req.session.currentUser.role === role) {
      next();
    } else {
      res.redirect('/');
    }
  },
};
