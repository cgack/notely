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


  notesService.get = function() {
      return notesService.notes;
  };
}

NotesService.$inject = ['$http'];
