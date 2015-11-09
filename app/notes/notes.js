(function() {
    angular.module('notely.notes', [
      'ui.router'
    ])
    .config(notesConfig);

    function notesConfig($stateProvider)   {

          $stateProvider

            .state('notes', {
              url: '/notes',
              template: '<h1>Notely</h1><p>{{ message }}</p>',
              controller: NotesController
            });
    }

  // http://anandmanisankar.com/posts/angularjs-dependency-injection-demystified/
    notesConfig['$inject'] = ['$stateProvider'];

    function NotesController($scope) {
      $scope.message = "Welcome to Notely!";
    }

    NotesController['$inject'] = ['$scope'];
})();
