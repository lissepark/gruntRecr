module VMPL {
    import IStateProvider = ng.ui.IStateProvider;
    import IUrlRouterProvider = ng.ui.IUrlRouterProvider;

    export class Routes {
        public static $inject = ['$stateProvider', '$urlRouterProvider'];

        public static configure(stateProvider:IStateProvider, urlRouterProvider:IUrlRouterProvider) {
            urlRouterProvider.otherwise('/index');
            stateProvider
                .state('main', {
                    controller: 'HomepageCtrl as hpCtrl',
                    templateUrl: '/templates/homepage.html',
                    url: '/index'
                });

        }
    }
}