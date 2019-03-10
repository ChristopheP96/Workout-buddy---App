/* eslint-disable func-names */
module.exports = function (app, express) {
  switch (process.env.NODE_ENV) {
    case 'development':
      app.use(express.errorHandler({
        dumpExceptions: true,
        showStack: true,
      }));
      break;
    case 'production':
      app.use(express.errorHandler());
      break;
    default:
  }
};
