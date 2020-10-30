const mongoose = require('mongoose');
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
});
module.exports = db;
