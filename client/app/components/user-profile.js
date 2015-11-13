{
  angular.module('notely')
  .directive('userProfile', () => {
    return {
      scope: {},
      controller: UserProfileController,
      controllerAs: 'ctrl',
      bindToController: true,
      template: `
        <a>{{ ctrl.user.name }}</a>
      `
    };
  });

  class UserProfileController {
    constructor($state, CurrentUser) {
      this.$state = $state;
      this.CurrentUser = CurrentUser;
      this.user = this.user();
    }

    user() {
      return this.CurrentUser.get();
    }
  }

  UserProfileController.$inject = ['$state', 'CurrentUser'];

}
