angular.module('notely')
.service('NotesService', NotesService);

function NotesService($http) {
  this.notes = [];

  this.fetch = function() {
      $http.get("//localhost:3000/notes")
      .success(function(notesData){
            console.log(notesData);
      })
  };
}

NotesService.$inject = ['$http'];
