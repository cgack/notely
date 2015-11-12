(function() {
  var app = angular.module('notely', [
    'ui.router',
    'notely.notes'
  ]);

  function config($urlRouterProvider) {
    $urlRouterProvider.otherwise('/notes/');
  }

  config['$inject'] = ['$urlRouterProvider'];
  app.config(config);
  app.constant('API_BASE', '//localhost:3000/api/v1/');
})();
