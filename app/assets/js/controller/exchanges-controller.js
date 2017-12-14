angular.module("app").controller("ExchangesController", function($scope, $rootScope, $http, $timeout){

    $scope.interval = 30000;
    $scope.bitCoinTrade = {};
    $scope.user = {};

    $scope.calcExchangeTax = function () {
        $scope.bitCoinTrade.tax = 0.005;
        $scope.bitCoinTrade.noTax = $scope.user.money / $scope.bitCoinTrade.buy;
        $scope.bitCoinTrade.totalTax = $scope.bitCoinTrade.noTax * $scope.bitCoinTrade.tax;
        $scope.bitCoinTrade.finalValue = $scope.bitCoinTrade.totalTax - $scope.bitCoinTrade.noTax;
    }

    
       
    $scope.getBitCoinTrade = function(){

        $http({
            method: 'GET',
            url: 'https://api.bitcointrade.com.br/v1/public/BTC/ticker/'
            }).then(function successCallback(response) {
                console.log(response);

            }, function errorCallback(response) {
                console.log(response);
            });

            $timeout(function () {
                $scope.getBitCoinTrade();
            }, $scope.interval);
    }
    $scope.getNegocieCoins = function () {
        $http({
            method: 'GET',
            url: 'https://broker.negociecoins.com.br/api/v3/btcbrl/ticker'
            }).then(function successCallback(response) {
                console.log(response);
                $scope.negocieCoins = response.data;
                $scope.bitCoinTrade = response.data.data;
            }, function errorCallback(response) {
                console.log(response);
            });
            $timeout(function () {
                $scope.getNegocieCoins();
            }, $scope.interval);
    }
    $scope.getBitCoinTrade();
    $scope.getNegocieCoins();

    
    


    


});