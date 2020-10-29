const mongoose = require('mongoose')
const url = require('./models/url')
const Url = require('./models/url')
const randomURL = require('./randomURL')
// set mongoDB
mongoose.connect(`mongodb://localhost/url-list`, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('Mongodb Error')
})
db.once('open', () => {
  console.log('Mongodb Connected!')
})

function checkAddress(address) {
  let newShortAddress = 0
  console.log('check start', newShortAddress)
  Url.findOne({ address: `${address}` })
    .then((item) => {
      console.log(item)
      if (item) {
        newShortAddress = item.shortAddress
        console.log('a', newShortAddress)
      } else {
        newShortAddress = randomURL()
        console.log('b', newShortAddress)
      }
      return newShortAddress
    })
    .catch((error) => console.log(error))
  console.log('end', newShortAddress)
  return newShortAddress
}

console.log('haha', checkAddress(1134))

function checkShortAddress(shortAddress) {
  Url.find({ shortAddress })
    .then((item) => {
      if (item) {
        const newShortAddress = randomURL()
        checkShortAddress(newShortAddress)
      } else {
        return shortAddress
      }
    })
    .catch((error) => console.log(error))
}

function shortenerURL(address) {
  let shortAddress = checkAddress(address)
  return checkShortAddress(shortAddress)
}

module.exports = shortenerURL
