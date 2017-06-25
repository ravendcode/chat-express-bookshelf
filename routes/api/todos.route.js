import express from 'express';
import _ from 'lodash';

const router = express.Router();

router.get('/', (req, res, next) => {
  res.send({
    todos: ['1', '2'],
  });
});

router.post('/', (req, res, next) => {

  let body = _.pick(req.body, ['title']);

  let rules = {
    title: {
      required: true,
      minlength: 3,
    },
  };
  res.validator.validate(body, rules).then(() => {
    res.send('Good');
  }).catch((e) => res.status(400).send(e));
});

export default router;
