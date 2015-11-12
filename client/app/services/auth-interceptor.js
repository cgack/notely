angular.module('notely')
  .factory('AuthInterceptor', [ 'AuthToken', 'API_BASE',
    (AuthToken, API_BASE) => {
        return {
          request: (config) => {
            let token = AuthToken.get();
            if (token && config.url.indexOf(API_BASE) > -1) {
                config.headers['Authorization'] = token;
            }
            return config;
          }
        }
  }]);

angular.module('notely')
  .config(['$httpProvider', ($httpProvider) => {
      return $httpProvider.interceptors.push('AuthInterceptor');
  }]);
