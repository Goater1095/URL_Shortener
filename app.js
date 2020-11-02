const express = require('express');
const exhbs = require('express-handlebars');
const bodyParser = express.urlencoded({ extended: true });

const Url = require('./models/url');
const randomURL = require('./randomURL');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser);

require('./config/mongoose');

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
        res.render('index', {
          address: url.address,
          shortAddress: url.shortAddress,
        });
      } else {
        //資料庫沒有網址,直接進入函式產生短網址
        let shortAddress = '';
        function find() {
          shortAddress = `http://` + req.get('host') + '/' + randomURL();
          Url.findOne({ shortAddress })
            .then((url) => {
              if (url) return find(); //recursion
            })
            .catch((error) => console.log(`error:迴圈`));
        }
        find();

        //建立資料
        Url.create({ address, shortAddress })
          .then((url) => {
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

app.get('/:randomWords', (req, res) => {
  const randomWords = req.params.randomWords;
  const shortAddress = `http://` + req.get('host') + '/' + randomWords;
  Url.findOne({ shortAddress })
    .then((url) => res.redirect(url.address))
    .catch((error) => res.send(`Error: the shortAddress does not exist.`));
});

//start server
app.listen(port, () => {
  console.log(`This server is start on http://localhost:${port}`);
});
