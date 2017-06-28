import express from 'express';
import User from '../../models/user';
import _ from 'lodash';

const router = express.Router();

let fields = ['name', 'email', 'password'];

router.get('/', (req, res, next) => {
  // req.knex.select().from('users').then((users) => {
  //   res.send({users});
  // }).catch((e) => next(e));

  User.fetchAll().then((users) => {
    res.send({
      users
    });
  }).catch((e) => next(e));
});

router.get('/:id', (req, res, next) => {
  // req.knex('users').where('id', req.params.id).then((users) => {
  //   let user = users[0];
  //   delete user.password;
  //   res.send({
  //     user
  //   });
  // }).catch((e) => next(e));
  // User.forge({id: req.params.id}).fetch().then((user) => {
  //   res.send({user});
  // }).catch((e) => next(e));
  res.send({
    user: req.user
  });
});

router.post('/', (req, res, next) => {
  let body = _.pick(req.body, fields);
  let rules = {
    name: {
      required: true,
      minlength: 2,
      maxlength: 10,
      unique: User,
    },
    email: {
      required: true,
      email: true,
      maxlength: 100,
      unique: User,
    },
    password: {
      required: true,
      minlength: 6,
      maxlength: 10,
    },
  };

  res.validator.validate(body, rules).then(() => {
    User.forge(body).save().then((user) => {
      res.status(201).send({
        user
      });
    });
  }).catch((e) => res.status(400).send(e));
});

router.patch('/:id', (req, res, next) => {
  let body = _.pick(req.body, fields);

  // User.forge({id: req.params.id}).fetch({require: true}).then((user) => {
  //   return user.save(body).then(() => {
  //     res.send({user});
  //   });
  // }).catch((e) => next(e));

  let rules = {
    name: {
      // required: true,
      minlength: 2,
      maxlength: 10,
      unique: {
        model: User,
        value: req.user.toJSON().name
      },
    },
    email: {
      email: true,
      maxlength: 100,
      unique: {
        model: User,
        value: req.user.toJSON().email
      },
    },
    password: {
      minlength: 6,
      maxlength: 10,
    },
  };

  res.validator.validate(body, rules).then(() => {
    req.user.save(body).then(() => {
      res.send({
        user: req.user
      });
    });
  }).catch((e) => res.status(400).send(e));
});

router.delete('/:id', (req, res, next) => {
  // req.knex('users').where('id', req.params.id).del().then(() => {
  //   return req.knex('users').select().then((users) => {
  //     res.send({
  //       users
  //     });
  //   });
  // }).catch((e) => next(e));
  // User.forge({id: req.params.id}).fetch({require: true}).then((user) => {
  //   return user.destroy().then(() => {
  //     res.send({user});
  //   });
  // }).catch((e) => next(e));
  req.user.destroy().then(() => {
    return User.fetchAll().then((users) => {
      res.send({
        users
      });
    });
  }).catch((e) => next(e));
});

router.param('id', (req, res, next, id) => {
  if (isNaN(id)) {
    // return res.status(400).send();
    let error = new Error(req.__('error.bad request'));
    error.status = 400;
    return next(error);
  }
  User.forge({
    id
  }).fetch().then((user) => {
    if (user === null) {
      let error = new Error(req.__('error.user not found'));
      error.status = 404;
      return next(error);
    }
    req.user = user;
    next();
  });
});

export default router;
