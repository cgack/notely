(function() {
    angular.module('notely.notes', [
      'ui.router'
    ])
    .config(notesConfig);

    function notesConfig($stateProvider)   {

          $stateProvider

            .state('notes', {
              url: '/notes',
              template: '<h1>Notely</h1><p>{{ message }}</p><div ui-view></div>',
              controller: NotesController
            })

            .state('notes.form', {
              url: '/:noteId',
              templateUrl: '/notes/notes-form.html'
            });
    }
    notesConfig['$inject'] = ['$stateProvider'];

    function NotesController($scope) {
      $scope.message = "I <3 Angular.";
    }

    NotesController['$inject'] = ['$scope'];
})();

// http://anandmanisankar.com/posts/angularjs-dependency-injection-demystified/
