require('dotenv').load();
var express = require('express');
var app = express();
var Note = require('./models/note');
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header('access-control-allow-origin', '*');
  res.header('access-control-allow-methods', 'GET, POST, PUT, DELETE');
  res.header('access-control-allow-headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.get('/notes', function(req, res) {
  Note.find().sort({ updated_at: -1 })
  .then(function(notes){
      res.json(notes);
  });
});

app.post('/notes', function(req, res) {
  var note = new Note({
      title: req.body.note.title,
      body_html: req.body.note.body_html
  });

  note.save().then(function(noteData) {
    res.json({
      message: "saved!",
      note: noteData
    });
  });
});

app.put('/notes/:id', function(req, res) {
  Note.findOne({ _id: req.params.id })
  .then(function(note) {
      note.title = req.body.note.title;
      note.body_html = req.body.note.body_html;

      note.save().then(function(noteData) {
        res.json({
          message: "changes saved!",
          note: noteData
        });
      });
  });
});

app.listen(3000, function() {
    console.log('listening http://localhost:3000...');
});
