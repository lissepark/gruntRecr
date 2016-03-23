(():void => {
    let vmpl = angular.module('vmpl', ['ui.router', 'templates']);
    vmpl.config(['$stateProvider', '$urlRouterProvider', VMPL.Routes.configure]);
})();