module.exports = function (app, express) {
  app.configure(() => {
    app.use(express.logger());
    app.use(express.static(path.join((__dirname + '/public'));
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs'); //extension of views

  });

  //development configuration
  app.configure('development', () => {
    app.use(express.errorHandler({
      dumpExceptions: true,
      showStack: true
    }));
  });

  //production configuration
  app.configure('production', () => {
    app.use(express.errorHandler());
  });

};