angular.module('notely')
.service('NotesService', NotesService);

function NotesService($http) {
  var notesService = this;
  notesService.notes = [];

  notesService.fetch = function( callback ) {
      $http.get("//localhost:3000/notes")
      .success(function(notesData){
        notesService.notes = notesData;
        if (callback) {
          callback();
        }
      });
  };

  notesService.fetch2 = $http.get("//localhost:3000/notes");

  notesService.get = function() {
      return notesService.notes;
  };
}

NotesService.$inject = ['$http'];
