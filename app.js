const express = require('express');
const exhbs = require('express-handlebars');
const bodyParser = express.urlencoded({ extended: true });
const routes = require('./routes');
const app = express();
require('./config/mongoose');

const port = process.env.PORT || 3000;

app.use(bodyParser);
app.use(routes);

//set engine
app.engine('hbs', exhbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', 'hbs');

//start server
app.listen(port, () => {
  console.log(`This server is start on http://localhost:${port}`);
});
