import express from 'express';
import _ from 'lodash';
import User from '../../models/user';
import authMdw from '../../middleware/auth.middleware';

const router = express.Router();

router.get('/me', authMdw, (req, res, next) => {
  res.status(200).send({user: req.user});
});

router.post('/login', (req, res, next) => {
  let body = _.pick(req.body, ['email', 'password']);
  let rules = {
    email: {
      required: true,
      email: true
    },
    password: {
      required: true
    }
  };

  req.validator.validate(body, rules).then(() => {
    return User.findByCredentials(req, body.email, body.password).then((user) => {
      return user.generateAuthToken().then((token) => {
        res.header('x-auth', token).send({
          user
        });
      });
    });
  }).catch((e) => next(e));
});

router.delete('/me/token', authMdw, (req, res, next) => {
  req.user.removeToken().then(() => {
    res.status(200).send();
  }).catch((e) => next(e));
});

export default router;
