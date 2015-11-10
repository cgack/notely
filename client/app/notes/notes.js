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

    function NotesController($state) {
      $state.go('notes.form');
    }

    NotesController['$inject'] = ['$state'];
})();

// http://anandmanisankar.com/posts/angularjs-dependency-injection-demystified/
