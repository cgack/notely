angular.module('notely')
.service('NotesService', NotesService);

NotesService.$inject = ['$http'];
function NotesService($http) {
  var self = this;
  self.notes = [];

  self.fetch = function() {
      return $http.get("//localhost:3000/notes")
      .then(function(response){
        self.notes = response.data;
      }, function() {
        // fail
      });
  };

  self.create = function(note) {
    var noteCreatePromise = $http.post("//localhost:3000/notes", { note: note })
    noteCreatePromise
      .then(function(response) {
        self.notes.unshift(response.data.note);
      }, function() {

      });
    return noteCreatePromise;
  };

  self.update = function( note ) {
      var noteUpdatePromise = $http.put("//localhost:3000/notes/" + note._id, {
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
}
