const express = require('express');
const exhbs = require('express-handlebars');

const app = express();
const port = 3000;

//set routes
app.get('/', (req, res) => {
  res.send('Server start!');
});

//start server
app.listen(port, () => {
  console.log(`This server is start on http://localhost:${port}`);
});
