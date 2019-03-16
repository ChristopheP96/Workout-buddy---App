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
  notifications: (req, res, next) => {
    res.locals.errorMessages = req.flash('error');
    res.locals.infoMessages = req.flash('info');
    res.locals.dangerMessages = req.flash('danger');
    res.locals.successMessages = req.flash('success');
    res.locals.warningMessages = req.flash('warning');
    next();
  },
};
