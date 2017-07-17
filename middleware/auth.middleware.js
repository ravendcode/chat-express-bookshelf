import User from '../models/user';
import {UnauthorizedError} from '../utils';

export default (req, res, next) => {
  let token = req.header('x-auth');
  User.findByToken(req, token).then((user) => {
    if (!user) {
      let error = new UnauthorizedError(req.__('error.unauthorized'));
      return Promise.reject(error);
    }
    req.user = user;
    req.token = token;
    next();
  }).catch((e) => next(e));
};
