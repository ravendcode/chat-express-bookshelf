import express from 'express';
// import _ from 'lodash';

const router = express.Router();

router.get('/', (req, res, next) => {
  res.send({
    users: ['1', '2'],
  });
});

export default router;
