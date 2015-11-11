angular.module('notely')
.service('NotesService', NotesService);

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

  self.save = function(note) {
    return $http.post("//localhost:3000/notes", { note: note })
    .then(function(response) {
      self.notes.unshift(response.data.note);
    }, function() {

    });
  };

  self.get = function() {
      return self.notes;
  };

  self.findById = function(noteId) {
    for (var i = 0, ii = self.notes.length; i < ii; i++) {
      if (self.notes[i]._id === noteId) {
        return self.notes[i];
      }
    }
    return {};
  };
}

NotesService.$inject = ['$http'];
