angular.module('notely')
.service('NotesService', NotesService);

NotesService.$inject = ['$http', 'API_BASE'];
function NotesService($http, API_BASE) {
  var self = this;
  self.notes = [];

  self.fetch = function() {
      return $http.get(API_BASE + "notes")
      .then(function(response){
        self.notes = response.data;
      }, function() {
        // fail
      });
  };

  self.create = function(note) {
    var noteCreatePromise = $http.post(API_BASE + "notes", { note: note })
    noteCreatePromise
      .then(function(response) {
        self.notes.unshift(response.data.note);
      }, function() {

      });
    return noteCreatePromise;
  };

  self.update = function( note ) {
      var noteUpdatePromise = $http.put(API_BASE + "notes/" + note._id, {
        note: {
          title: note.title,
          body_html: note.body_html
        }
      });

      noteUpdatePromise
        .then(function(response) {
          self.replaceNote(response.data.note);
        }, function(response) {
          // Fail
        });
      return noteUpdatePromise;
  };

  self.delete = function( note ) {
    var noteDeletePromise = $http.delete(API_BASE + 'notes/' + note._id);
    noteDeletePromise.then(function(response) {
      self.deleteNote(response.data.note);
    });
    return noteDeletePromise;
  };

  self.get = function() {
      return self.notes;
  };

  self.findById = function(noteId) {
    for (var i = 0, ii = self.notes.length; i < ii; i++) {
      if (self.notes[i]._id === noteId) {
        return angular.copy(self.notes[i]);
      }
    }
    return {};
  };

  self.replaceNote = function( note ) {
      for (var i=0, ii = self.notes.length; i < ii; i++) {
        if (self.notes[i]._id === note._id) {
          self.notes[i] = note;
          break;
        }
      }
  };

  self.deleteNote = function(note) {
    for (var i = 0; i < self.notes.length; i++) {
      if (self.notes[i]._id = note._id) {
        self.notes.splice(i, 1);
        break;
      }
    }
  }
}
