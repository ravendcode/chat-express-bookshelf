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

  verifyPassword(password) {
    return this.get('password') === password;
  }

  toJSON() {
    delete this._previousAttributes['password'];
    return this._previousAttributes;
  }

  static byEmail(email) {
    return this.forge().query({
      where: {
        email: email
      }
    }).fetch();
  }
}
