import knexfile from '../../knexfile';
import config from '../../config';

let knexConnect = knexfile[config.env];

let knex = require('knex')(knexConnect);

let bookshelf = require('bookshelf')(knex);

export {
  bookshelf,
  knex,
};
