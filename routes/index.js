export default (app) => {
  app.use('/', require('./pages.route').default);
  app.use('/api/users', require('./api/users.route').default);
  app.use('/api/todos', require('./api/todos.route').default);
};
