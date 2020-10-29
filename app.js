const express = require('express')
const exhbs = require('express-handlebars')
const bodyParser = express.urlencoded({ extended: true })
const mongoose = require('mongoose')
const Url = require('./models/url')

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
  return Url.create(req.body)
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})
//start server
app.listen(port, () => {
  console.log(`This server is start on http://localhost:${port}`)
})
