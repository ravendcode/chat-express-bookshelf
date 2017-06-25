require('babel-register');
require('babel-polyfill');

const path = require('path');
const config = require('./config').default;

module.exports = {

  development: {
    // client: 'sqlite3',
    // connection: {
    //   filename: path.join(__dirname, './databases/sqlite3/db.sqlite3'),
    // },
    client: config.dbClient,
    connection: {
      host: config.dbHost,
      database: config.dbName,
      user: config.dbUser,
      password: config.dbPassword,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: path.join(__dirname, '/databases/migrations'),
    },
    seeds: {
      directory: path.join(__dirname, '/databases/seeds'),
    },
  },

  staging: {
    client: config.dbClient,
    connection: {
      host: config.dbHost,
      database: config.dbName,
      user: config.dbUser,
      password: config.dbPassword,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: path.join(__dirname, '/databases/migrations'),
    },
    seeds: {
      directory: path.join(__dirname, '/databases/seeds'),
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      host: config.dbHost,
      database: config.dbName,
      user: config.dbUser,
      password: config.dbPassword,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: path.join(__dirname, '/databases/migrations'),
    },
    seeds: {
      directory: path.join(__dirname, '/databases/seeds'),
    },
  },

};
