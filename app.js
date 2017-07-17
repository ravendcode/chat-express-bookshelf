import path from 'path';
// import http from 'http';
import express from 'express';
import morgan from 'morgan';
import i18n from 'i18n';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import hbs from 'hbs';
// import mongoose from './databases/connections/mongoose';
import {bookshelf, knex} from './databases/connections/bookshelf';
import {hbs as hbsUtils, Validator, NotFoundError, InternalServerError} from './utils';
import routes from './routes';

import config from './config';

const app = express();

if (config.env === 'development') {
  app.use(morgan('dev'));
  // redirect http server
  // app.all('*', function (req, res, next) {
  //   if (req.secure) {
  //     return next();
  //   }
  //   res.redirect('https://' + req.hostname + ':' + config.httpsPort + req.url);
  // });
  // http.createServer(app).listen(config.httpPort);
}

i18n.configure({
  locales: config.locales,
  defaultLocale: config.locale,
  directory: path.join(__dirname, 'locales'),
  queryParameter: 'lang',
  register: global,
});

// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(i18n.init);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'hbs');
app.set('view options', {
  layout: 'layouts/base',
});

// Handlebars
hbs.registerPartials(path.join(__dirname, 'views/partials'));
hbsUtils(hbs);
hbs.localsAsTemplateData(app);

if (config.env === 'development') {
  // Seeds
  // require('./databases/seeds/users.seeder').usersSeeder(() => {
  //   require('./databases/seeds/todos.seeder').todosSeeder(() => {})
  // })
}

// Middleware
app.use((req, res, next) => {
  // req.mdb = mongoose;
  req.db = bookshelf;
  req.knex = knex;
  let lang = req.query.lang;
  if (lang !== undefined && config.locales.includes(lang)) {
    res.setLocale(req.query.lang);
  } else {
    res.setLocale(config.locale);
  }

  req.validator = new Validator(res.__);

  app.locals.app = {
    env: config.env,
    httpPort: config.httpPort,
    httpsPort: config.httpsPort,
    host: config.host,
    locale: res.getLocale(),
  };

  next();
});

// app.use(require('./middleware/log.middleware').default);

// Routes
routes(app);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new NotFoundError(req.__('error.not found'));
  next(err);
});

// Error handler
app.use((err, req, res, next) => {
  if (err.status === 400 && err.name === 'ValidationError') {
    return res.status(400).send(err);
  }
  if (err.status === 400 && err.name === 'BadRequestError') {
    return res.status(400).send(err);
  }
  if (err.status === 401 && err.name === 'UnauthorizedError') {
    return res.status(401).send(err);
  }
  if (err.status === 401 && err.name === 'BadTokenError') {
    return res.status(401).send(err);
  }
  if (err.status === 400 && err.name === 'LoginError') {
    return res.status(400).send(err);
  }
  if (err.status === 404 && err.name === 'NotFoundError') {
    return res.status(404).send(err);
  }
  let error = new InternalServerError(err.message);
  res.status(500).send(error);
});

export default app;
