const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

var app = express(); // express application
app.use(bodyParser.urlencoded({ extended: false }));

// static directory
app.use(express.static('static'));

// Home page: index.html
app.get('/', (req, res) => {
  res.sendFile('./static/index.html');
});

app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});
