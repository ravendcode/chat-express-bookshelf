// require('babel-register');
// require('babel-polyfill');
const faker = require('faker');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const moment = require('moment');

let salt = bcrypt.genSaltSync(10);
let password = bcrypt.hashSync('qwerty', salt);

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert(_.union([{
          id: 1,
          name: 'root',
          email: 'root@email.com',
          password: password,
          is_staff: true,
          created_at: datetimeNow,
          updated_at: datetimeNow,
        },
        {
          id: 2,
          name: 'vova',
          email: 'vova@email.com',
          password: password,
          created_at: datetimeNow,
          updated_at: datetimeNow,
        },
        {
          id: 3,
          name: 'bob',
          email: 'bob@email.com',
          password: password,
          created_at: datetimeNow,
          updated_at: datetimeNow,
        },
        {
          id: 4,
          name: 'fox',
          email: 'fox@email.com',
          password: password,
          created_at: datetimeNow,
          updated_at: datetimeNow,
        },
      ], listUser));
    });
};

let datetimeNow = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
let listUser = [];

for (let i = 5; i <= 10; i++) {
  let name = faker.name.firstName().toLowerCase();
  let datetime = moment(faker.date.recent()).format('YYYY-MM-DD HH:mm:ss');
  listUser.push({
    id: i,
    name: name,
    email: name + '@email.com',
    password: password,
    created_at: datetime,
    updated_at: datetime,
  });
}
