var express = require('express');
var app = express();
var Note = require('./models/note');

app.use(function(req, res, next) {
  res.header('access-control-allow-origin', '*');
  next();
});

app.get('/notes', function(req, res) {
  Note.find()
  .then(function(notes){
      res.json(notes);
  });
});

app.listen(3000, function() {
    console.log('listening http://localhost:3000...');
});
