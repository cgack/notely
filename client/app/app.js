(function() {
  var app = angular.module('notely', [
    'ui.router',
    'notely.notes',
    'flash'
  ]);

  function config($urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/notes/');

  }

  config['$inject'] = ['$urlRouterProvider', '$locationProvider'];
  app.config(config);
  app.constant('API_BASE', '//localhost:3000/api/v1/');
})();
