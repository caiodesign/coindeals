angular.module('app', ['ui.router']).config(config);

function config( $stateProvider, $urlRouterProvider, $locationProvider ){
    
    $urlRouterProvider.otherwise('/home');

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'views/home.html',
            controller: 'ExchangesController as compare'
        });
        $locationProvider.html5Mode({
            enabled: !0,
            requireBase: !0
        });

};

