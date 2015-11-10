angular.module('notely')
.service('NotesService', NotesService);

function NotesService($http) {
  var notesService = this;
  notesService.notes = [];

  notesService.fetch = function() {
      return $http.get("//localhost:3000/notes")
      .then(function(response){
        notesService.notes = response.data;
      }, function() {
        // fail
      });
  };

  notesService.save = function(note) {
    //TODO: something fun with node api
    return $http.post("//localhost:3000/notes", { note: note })
    .then(function(response) {
      notesService.notes.unshift(response.data.note);
    }, function() {

    });
  };

  notesService.get = function() {
      return notesService.notes;
  };
}

NotesService.$inject = ['$http'];
