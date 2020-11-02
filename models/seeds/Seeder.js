const db = require('../../config/mongoose');
const randomURL = require('../../randomURL');
const Url = require('../url');
const webList = [
  'https://www.google.com/',
  'https://www.youtube.com/',
  'https://www.facebook.com/',
];

db.once('open', () => {
  for (let address of webList) {
    Url.create({
      address,
      shortAddress: `http://` + req.get('host') + '/' + randomURL(),
    });
  }
  console.log('Done');
});
