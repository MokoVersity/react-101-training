var path = require('path');
var express = require('express');

var app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:3000');
});
