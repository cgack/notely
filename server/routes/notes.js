var router = require('express').Router();
var Note = require('../models/note');

router.get('/', function(req, res) {
  Note.find({ user: req.user }).sort({ updated_at: -1 })
  .then(function(notes){
      res.json(notes);
  });
});

router.post('/', function(req, res) {
  var note = new Note({
      title: req.body.note.title,
      body_html: req.body.note.body_html,
      user: req.user
  });

  note.save().then(function(noteData) {
    res.json({
      message: "saved!",
      note: noteData
    });
  }, (err) => {
    res.send(500, 'There was a problem saving your note.');
  });
});

router.put('/:id', function(req, res) {
  Note.findOne({ _id: req.params.id, user: req.user })
  .then(function(note) {
      note.title = req.body.note.title;
      note.body_html = req.body.note.body_html;

      note.save().then(function(noteData) {
        res.json({
          message: "changes saved!",
          note: noteData
        });
      });
  }, function(err) {
    // TODO: log the err message somewhere?
    res.send(500, 'There was a problem saving.');
  });
});

router.delete('/:id', function(req, res) {
  Note.findOne({ _id: req.params.id, user: req.user })
  .then(function(note) {
      note.remove().then(function(){
        res.json({
          message: 'note removed',
          note: note
        });
      });
  }, function(err) {
    res.send(500, 'There was a problem deleting this note.');
  });
});


module.exports = router;
