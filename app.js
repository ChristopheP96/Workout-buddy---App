const createError = require('http-errors');
const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const profileRouter = require('./routes/profile');
const sportsRouter = require('./routes/sports');


const databaseUrl = process.env.DATABASE_URL || 'mongodb://localhost:27017/WorkoutApp';
mongoose.connect(databaseUrl, { useNewUrlParser: true })
  .then(() => {
    console.log('connected');
  })
  .catch((error) => {
    next(error);
  });

const app = express();

app.set('port', process.env.PORT || 3000);

require('./env.js')(app, express);

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
  secret: 'WorkoutApp',
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

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/profile', profileRouter);
app.use('/sports', sportsRouter);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(404).render('404');
});

// error handler
app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('500');
});

module.exports = app;
