import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import {BadTokenError, LoginError} from '../utils';
import config from '../config';
import {
  bookshelf
} from '../databases/connections/bookshelf';
// import _ from 'lodash';

export default class User extends bookshelf.Model {
  get tableName() {
    return 'users';
  }

  get hasTimestamps() {
    return true;
  }

  toJSON() {
    delete this._previousAttributes['password'];
    delete this._previousAttributes['token'];
    return this._previousAttributes;
  }

  checkPassword(password) {
    return bcrypt.compareSync(password, this.get('password'));
  }

  hashPassword() {
    let salt = bcrypt.genSaltSync(10);
    let password = bcrypt.hashSync(this.get('password'), salt);
    return this.save({password});
  }

  generateAuthToken() {
    let id = this.get('id');
    let access = 'auth';
    let token = jwt.sign({
      id,
      access
    }, config.salt);
    return this.save({token}).then((user) => {
      return token;
    });
  }

  removeToken() {
    return this.save({token: null}).then((user) => {
      return user;
    });
  }

  static byEmail(email) {
    return this.forge().query({
      where: {
        email: email
      }
    }).fetch();
  }

  static findByToken(req, token) {
    try {
      let decode = jwt.verify(token, config.salt);
      return this.forge({id: decode.id, token}).fetch();
    } catch (e) {
      let error = new BadTokenError(req.__('error.bad token'));
      return Promise.reject(error);
    }
  }

  static findByCredentials(req, email, password) {
    return User.byEmail(email).then((user) => {
      let error = new LoginError(req.__('error.login'));
      if (!user) {
        return Promise.reject(error);
      }
      if (!user.checkPassword(password)) {
        return Promise.reject(error);
      }
      return user;
    });
  }
}
