angular.module('notely')
.directive('signIn', ['$state', 'UsersService', ($state, UsersService) => {
  class SignInController {
    constructor() {
      this.user = {};
    }

    login() {
      UsersService.login(this.user).then((response) => {
          $state.go('notes.form', {noteId: undefined});
      });
    }
  }

  return {
    state: {},
    controller: SignInController,
    controllerAs: 'ctrl',
    bindToController: this,
    templateUrl: '/components/sign-in.html'
  };
}]);
