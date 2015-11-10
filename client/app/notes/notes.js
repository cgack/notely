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
      NotesService.fetch().then(function() {
          $scope.notes = NotesService.get();
      });

      $state.go('notes.form');
    }

    NotesController['$inject'] = ['$scope', '$state', 'NotesService'];
})();

// http://anandmanisankar.com/posts/angularjs-dependency-injection-demystified/
