const express = require('express');
const flash = require('flash');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const { notifications } = require('./middlewares');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const profileRouter = require('./routes/profile');
const sportsRouter = require('./routes/sports');

require('dotenv').config();

<<<<<<< HEAD
=======
console.log(process.env.DATABASE_URL);
>>>>>>> d334a0f5295680939f2fabd7337de736a59c1fa3
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
  .then(() => {
    console.log('connected');
  })
  .catch((error) => {
    console.error(`cannot connect to mongodb at ${process.env.DATABASE_URL}`, error);
  });

const app = express();

<<<<<<< HEAD

app.locals.title = 'workoutApp';

app.set('port', process.env.PORT);

=======
>>>>>>> d334a0f5295680939f2fabd7337de736a59c1fa3
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layouts/layout');

app.use(expressLayouts);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(session({
  secret: process.env.SECRET,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
  },
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60, // 1 day
  }),
}));
app.use(flash());
app.use((req, res, next) => {
  res.locals.currentUser = req.session.currentUser;
  next();
});
app.use(notifications);

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/profile', profileRouter);
app.use('/sports', sportsRouter);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(404).render('404');
});

<<<<<<< HEAD
// catch 500 and forward to error handler
=======
// error handler
>>>>>>> d334a0f5295680939f2fabd7337de736a59c1fa3
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('500');
});

module.exports = app;
