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
        console.log('data on db');
        res.render('index', {
          address: url.address,
          shortAddress: url.shortAddress,
        });
      } else {
        //資料庫沒有網址,產生短網址
        console.log('No data');
        let shortAddress = randomURL();
        //判斷短網址是否重複
        if (Url.findOne({ shortAddress })) {
          //短網址重複,重新產生一個短網址進入迴圈
          console.log('produce new short data');
          shortAddress = randomURL();
        }
        //建立資料
        Url.create({ address, shortAddress })
          .then((url) => {
            console.log('成功建立2', url.address, url.shortAddress);
            res.render('index', {
              address: url.address,
              shortAddress: url.shortAddress,
            });
          })
          .catch((error) => console.log(error));
      }
    })
    .catch((error) => console.log(error));
});
//start server
app.listen(port, () => {
  console.log(`This server is start on http://localhost:${port}`);
});
