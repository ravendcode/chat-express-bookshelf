
require('babel-register');
require('babel-polyfill');

const _ = require('lodash');
const faker = require('faker');
const moment = require('moment');

// require('./es7');

let x = _.union([1], [1, 11]);

console.log(x);
console.log(faker.name.firstName());

console.log(Date.now());

moment.utc();
console.log(moment(new Date()).format('YYYY-MM-DD HH:mm:ss'));
console.log(faker.date);
console.log(faker.date.recent());
console.log(moment(faker.date.recent()).format('YYYY-MM-DD HH:mm:ss'));
