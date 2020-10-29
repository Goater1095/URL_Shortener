const express = require('express')
const exhbs = require('express-handlebars')
const bodyParser = express.urlencoded({ extended: true })
const mongoose = require('mongoose')
const Url = require('./models/url')
const randomURL = require('./randomURL')

const app = express()
const port = 3000

app.use(bodyParser)

//set mongoDB
mongoose.connect(`mongodb://localhost/url-list`, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('Mongodb Error')
})
db.once('open', () => {
  console.log('Mongodb Connected!')
})

//set engine
app.engine('hbs', exhbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

//set routes
app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  let shortAddress = randomURL()
  console.log(shortAddress)
  Url.find({ shortAddress: `${shortAddress}` })
    .then((item) => console.log(item))
    .catch((error) => console.log(error))
  // while (Url.find({ shortAddress: `${shortAddress}` })) {
  //   shortAddress = randomURL()
  //   console.log(shortAddress)
  // }

  const address = req.body.address
  return Url.create({ address, shortAddress })
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})
//start server
app.listen(port, () => {
  console.log(`This server is start on http://localhost:${port}`)
})
