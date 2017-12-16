var app = angular.module('app', ['ui.router']).config(config);

function config( $stateProvider, $urlRouterProvider, $locationProvider ){
    
    $urlRouterProvider.otherwise('/home');

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'views/home.html',
            controller: 'ExchangesController'
        });
        $locationProvider.html5Mode({
            enabled: !0,
            requireBase: !0
        });

};

app.directive("preventTypingGreater", function() {
    return {
        link: function(scope, element, attributes) {
        var oldVal = null;
        element.on("keydown keyup", function(e) {
        if (Number(element.val()) > Number(attributes.max) &&
            e.keyCode != 46 // delete
            &&
            e.keyCode != 8 // backspace
            ) {
            e.preventDefault();
            element.val(oldVal);
            } else {
            oldVal = Number(element.val());
            }
        });
        }
    };
});

