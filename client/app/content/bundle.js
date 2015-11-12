'use strict';

(function () {
  var app = angular.module('notely', ['ui.router', 'notely.notes']);

  function config($urlRouterProvider) {
    $urlRouterProvider.otherwise('/notes/');
  }

  config['$inject'] = ['$urlRouterProvider'];
  app.config(config);
  app.constant('API_BASE', '//localhost:3000/api/v1/');
})();
'use strict';

(function () {
  angular.module('notely.notes', ['ui.router', 'textAngular']).config(notesConfig);

  notesConfig['$inject'] = ['$stateProvider'];
  function notesConfig($stateProvider) {

    $stateProvider.state('notes', {
      url: '/notes',
      resolve: {
        notesLoaded: ['NotesService', function (NotesService) {
          return NotesService.fetch();
        }]
      },
      templateUrl: '/notes/notes.html',
      controller: NotesController
    }).state('notes.form', {
      url: '/:noteId',
      templateUrl: '/notes/notes-form.html',
      controller: NotesFormController
    });
  }

  NotesController['$inject'] = ['$scope', '$state', 'NotesService'];
  function NotesController($scope, $state, NotesService) {
    $scope.notes = NotesService.get();
  }

  NotesFormController.$inject = ['$scope', '$state', 'NotesService'];
  function NotesFormController($scope, $state, NotesService) {
    $scope.note = NotesService.findById($state.params.noteId);

    $scope.save = function () {
      // decide to update or create
      if ($scope.note._id) {
        NotesService.update($scope.note).then(function (response) {
          $scope.note = angular.copy(response.data.note);
        });
      } else {
        NotesService.create($scope.note).then(function (response) {
          $state.go('notes.form', { noteId: response.data.note._id });
        });
      }
    };

    $scope['delete'] = function () {
      if ($scope.note._id) {
        NotesService['delete']($scope.note).then(function (response) {
          $state.go('notes.form', { noteId: undefined });
        });
      }
    };
  }
})();
'use strict';

angular.module('notely').service('NotesService', NotesService);

NotesService.$inject = ['$http', 'API_BASE'];
function NotesService($http, API_BASE) {
  var self = this;
  self.notes = [];

  self.fetch = function () {
    return $http.get(API_BASE + "notes").then(function (response) {
      self.notes = response.data;
    }, function () {
      // fail
    });
  };

  self.create = function (note) {
    var noteCreatePromise = $http.post(API_BASE + "notes", { note: note });
    noteCreatePromise.then(function (response) {
      self.notes.unshift(response.data.note);
    }, function () {});
    return noteCreatePromise;
  };

  self.update = function (note) {
    var noteUpdatePromise = $http.put(API_BASE + "notes/" + note._id, {
      note: {
        title: note.title,
        body_html: note.body_html
      }
    });

    noteUpdatePromise.then(function (response) {
      self.replaceNote(response.data.note);
    }, function (response) {
      // Fail
    });
    return noteUpdatePromise;
  };

  self['delete'] = function (note) {
    var noteDeletePromise = $http['delete'](API_BASE + 'notes/' + note._id);
    noteDeletePromise.then(function (response) {
      self.deleteNote(response.data.note);
    });
    return noteDeletePromise;
  };

  self.get = function () {
    return self.notes;
  };

  self.findById = function (noteId) {
    for (var i = 0, ii = self.notes.length; i < ii; i++) {
      if (self.notes[i]._id === noteId) {
        return angular.copy(self.notes[i]);
      }
    }
    return {};
  };

  self.replaceNote = function (note) {
    for (var i = 0, ii = self.notes.length; i < ii; i++) {
      if (self.notes[i]._id === note._id) {
        self.notes[i] = note;
        break;
      }
    }
  };

  self.deleteNote = function (note) {
    for (var i = 0; i < self.notes.length; i++) {
      if (self.notes[i]._id = note._id) {
        self.notes.splice(i, 1);
        break;
      }
    }
  };
}
//# sourceMappingURL=bundle.js.map
