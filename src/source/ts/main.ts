(():void => {
    let vmpl = angular.module('vmpl', ['ui.router', 'ui.bootstrap', 'templates']);
    vmpl.config(['$stateProvider', '$urlRouterProvider', VMPL.Routes.configure]);
})();