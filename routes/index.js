export default (app) => {
  app.use('/', require('./pages.route').default);
  app.use('/api/users', require('./api/users.route').default);
};
