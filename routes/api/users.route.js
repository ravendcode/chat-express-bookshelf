import express from 'express';
// import _ from 'lodash';

const router = express.Router();

router.get('/', (req, res, next) => {
  req.knex.select().from('users').then((users) => {
    res.send({users});
  }).catch((e) => next(e));
});

router.get('/:id', (req, res, next) => {
  req.knex('users').where('id', req.params.id).then((users) => {
    let user = users[0];
    delete user.password;
    res.send({user});
  }).catch((e) => next(e));
});

router.delete('/:id', (req, res, next) => {
  req.knex('users').where('id', req.params.id).del().then(() => {
    return req.knex('users').select().then((users) => {
      res.send({users});
    });
  }).catch((e) => next(e));
});

export default router;
