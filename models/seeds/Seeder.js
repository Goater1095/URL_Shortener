const db = require('../../config/mongoose');
const randomURL = require('../../randomURL');
const host = 'http://localhost:3000/';
const Url = require('../url');
const webList = [
  'https://www.google.com/',
  'https://www.youtube.com/',
  'https://www.facebook.com/',
];

db.once('open', () => {
  for (let address of webList) {
    Url.create({ address, shortAddress: host + randomURL() });
  }
  console.log('Done');
});
