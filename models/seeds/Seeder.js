const mongoose = require('mongoose');
const randomURL = require('../../randomURL');

const Url = require('../url');
const webList = [
  'https://www.google.com/',
  'https://www.youtube.com/',
  'https://www.facebook.com/',
];

//set mongoDB
mongoose.connect(`mongodb://localhost/url-list`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', () => {
  console.log('Mongodb Error');
});
db.once('open', () => {
  console.log('Mongodb Connected!');
  for (let address of webList) {
    Url.create({ address, shortAddress: randomURL() });
  }
  console.log('Done');
});
