/* eslint-disable func-names */
const errorhandler = require('errorhandler');

module.exports = function (app) {
  switch (process.env.NODE_ENV) {
    case 'production':
      app.use(errorhandler());
      break;

    case 'development':
    default:
      app.use(errorhandler({
        dumpExceptions: true,
        showStack: true,
      }));
  }
};
