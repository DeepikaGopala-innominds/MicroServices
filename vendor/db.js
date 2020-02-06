const mongoose = require('mongoose');

const MONGO_USERNAME = '';
const MONGO_PASSWORD = '';
const MONGO_HOSTNAME = '127.0.0.1';
const MONGO_PORT = '27017';
const MONGO_DB = 'expenceManagement';
//${MONGO_USERNAME}:${MONGO_PASSWORD}@
const url = `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

mongoose.connect(url, {useNewUrlParser: true});