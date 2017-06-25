import path from 'path';
import fs from 'fs';
import {normalizePort} from './utils';

const env = process.env.NODE_ENV || 'development';
// const env = 'production'
const httpPort = 80;
const httpsPort = normalizePort(process.env.PORT || 443);

const httpsOptions = {
  key: fs.readFileSync(path.join(__dirname, 'ssl/private.key')),
  cert: fs.readFileSync(path.join(__dirname, 'ssl/certificate.pem')),
};

let mongoDbName = process.env.MONGODB_NAME || 'chat';
// const mongoDbHost = process.env.MONGODB_HOST || 'localhost'
// const mongoDbPort = utils.normalizePort(process.env.MONGODB_PORT || 27017)
// const mongoDbUser = process.env.MONGODB_USER
// const mongoDbPassword = process.env.MONGODB_PASSWORD
// const mongoDbUri = process.env.MONGODB_URI || `mongodb://${mongoDbUser}:${mongoDbPassword}@${mongoDbHost}:${mongoDbPort}/${mongoDbName}`
const mongoDbUri = process.env.MONGODB_URI || `mongodb://localhost/${mongoDbName}`;

let dbClient = process.env.DB_CLIENT || 'mysql';
let dbHost = process.env.DB_HOST || '127.0.0.1';
let dbUser = process.env.DB_USER || 'root';
let dbPassword = process.env.DB_PASSWORD || 'qwerty';
let dbName = process.env.DB_NAME || 'chat_express_sql';

if (process.env.NODE_ENV === 'test') {
  mongoDbName += '_test';
  console.log(`env is ${env}`);
}

const salt = process.env.SALT || '$2a$10$gK5iJIrl2/drnIpSOLdWpO';
const host = process.env.HOST || 'app.dev';
const locales = ['en', 'ru'];
const locale = 'ru';

export default {
  env,
  httpPort,
  httpsOptions,
  httpsPort,
  mongoDbUri,
  dbClient,
  dbHost,
  dbUser,
  dbPassword,
  dbName,
  salt,
  host,
  locales,
  locale,
};
