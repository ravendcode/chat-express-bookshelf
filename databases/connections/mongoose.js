import mongoose from 'mongoose';
const debug = require('debug')('app:mongodb');
import config from '../../config';


// mongoose.connect(config.mongoDbUri, {
//     auth: {
//         authdb: 'admin'
//     }
// })

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoDbUri, {config: {autoIndex: config.env !== 'production'}});

if (config.env === 'development') {
  mongoose.set('debug', true);
}

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));
db.once('open', function () {
  debug('connection success');
});

export default db;
