const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const urlSchema = new Schema({
  address: {
    type: String,
    required: true,
  },
  shortAddress: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Url', urlSchema);
