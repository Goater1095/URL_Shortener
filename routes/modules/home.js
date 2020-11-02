const express = require('express');
const router = express.Router();
const randomURL = require('../../randomURL');
const Url = require('../../models/url');

router.get('/', (req, res) => {
  res.render('index');
});

router.post('/', (req, res) => {
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
        //  fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        let shortAddress = '';
        function find() {
          shortAddress =
            req.protocol +
            '://' +
            req.get('host') +
            req.originalUrl +
            randomURL();
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

router.get('/:randomWords', (req, res) => {
  const randomWords = req.params.randomWords;
  const shortAddress = req.protocol + '://' + req.get('host') + req.originalUrl;
  console.log(shortAddress);
  Url.findOne({ shortAddress })
    .then((url) => res.redirect(url.address))
    .catch((error) => res.send(`Error: the shortAddress does not exist.`));
});

module.exports = router;
