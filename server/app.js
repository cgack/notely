var express = require('express');
var app = express();

var db = require('mongoose');
db.connect('mongodb://notely:notely@ds053194.mongolab.com:53194/notely');

var NoteSchema = db.Schema({
    title: String,
    body_html: String,
    body_text: String,
    updated_at: { type: Date, default: Date.now }
});

var Note = db.model('Note', NoteSchema);

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
