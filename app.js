const express = require('express')
const exhbs = require('express-handlebars')
const bodyParser = express.urlencoded({ extended: true })

const app = express()
const port = 3000

app.use(bodyParser)

//set engine
app.engine('hbs', exhbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

//set routes
app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  console.log(req.body)
  console.log('Success!')
})
//start server
app.listen(port, () => {
  console.log(`This server is start on http://localhost:${port}`)
})
