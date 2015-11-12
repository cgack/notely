angular.module('notely')
.directive('signUp', () => {

  class SignUpController {
    constructor() {
      this.user = {};
    }

    submit() {
      alert(this.user.username);
    }
  }
  return {
      scope: {},
      controller: SignUpController,
      controllerAs: 'ctrl',
      bindToController: true,
      templateUrl: '/components/sign-up.html'
  };
});
