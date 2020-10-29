const express = require('express');
const exhbs = require('express-handlebars');
const bodyParser = express.urlencoded({ extended: true });
const mongoose = require('mongoose');
const Url = require('./models/url');
const randomURL = require('./randomURL');

const app = express();
const port = 3000;

app.use(bodyParser);

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

//set engine
app.engine('hbs', exhbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', 'hbs');

//set routes
app.get('/', (req, res) => {
  res.render('index');
});

app.post('/', (req, res) => {
  const address = req.body.address;
  Url.findOne({ address })
    .lean()
    .then((url) => {
      if (url) {
        //資料庫有網址
        res.render('index', { url });
      } else {
        //沒有找到網址
        const shortAddress = randomURL();
        Url.findOne({ shortAddress })
          .then()
          .catch((error) => console.log(error));
        res.send(`找不到--${shortAddress}`);
      }
    });
});
//start server
app.listen(port, () => {
  console.log(`This server is start on http://localhost:${port}`);
});
