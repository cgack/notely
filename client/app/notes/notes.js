(function() {
    angular.module('notely.notes', [
      'ui.router'
    ])
    .config(notesConfig);

    function notesConfig($stateProvider)   {

          $stateProvider

            .state('notes', {
              url: '/notes',
              templateUrl: '/notes/notes.html',
              controller: NotesController
            })

            .state('notes.form', {
              url: '/:noteId',
              templateUrl: '/notes/notes-form.html'
            });
    }
    notesConfig['$inject'] = ['$stateProvider'];

    function NotesController($scope, $state, NotesService) {
      NotesService.fetch(function() {
        $scope.notes = NotesService.get();
      });

      NotesService.fetch2.success(function(d) {
          $scope.notes = d;
      });
      $state.go('notes.form');
    }

    NotesController['$inject'] = ['$scope', '$state', 'NotesService'];
})();

// http://anandmanisankar.com/posts/angularjs-dependency-injection-demystified/
