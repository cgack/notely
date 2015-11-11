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
              templateUrl: '/notes/notes-form.html',
              controller: NotesFormController
            });
    }
    notesConfig['$inject'] = ['$stateProvider'];

    function NotesController($scope, $state, NotesService) {
      $scope.note = {};

      $scope.save = function() {
        NotesService.save( $scope.note );
      }

      NotesService.fetch().then(function() {
          $scope.notes = NotesService.get();
          // TEST for findById
          // 564242bae4b0ecb0579e2593
          // var note = NotesService.findById('564242bae4b0ecb0579e2593');
          // console.log(note);
      });
    }

    NotesController['$inject'] = ['$scope', '$state', 'NotesService'];

    function NotesFormController() {

    }
})();
