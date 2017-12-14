angular.module("app").controller("ExchangesController", function($scope, $scope, $http, $timeout){

    $scope.interval = 20000;
    $scope.user = {};

    $scope.taxes = {
        bitCoinTrade: 0.005,
        negocieCoins: 0.005
    }

    $scope.bestExchange = {
        is: null
    }

    $scope.exchanges = [];

    

    $scope.calcExchangeTax = function () {
        
        for (var i = 0; i < $scope.exchanges.length; i++) {
            var exchange = $scope.exchanges[i];

            exchange.noTax = $scope.user.money / exchange.buy;
            exchange.totalTax = exchange.noTax * exchange.tax;
            exchange.withTax = exchange.noTax - exchange.totalTax;

        }

    }
       
    $scope.getBitCoinTrade = function(){

        $http({
            method: 'GET',
            url: 'https://api.bitcointrade.com.br/v1/public/BTC/ticker/'
            }).then(function successCallback(response) {

                $scope.exchanges[0] = response.data.data;
                $scope.exchanges[0].name = "Bitcoin Trade";
                $scope.exchanges[0].tax = $scope.taxes.bitCoinTrade;
                $scope.calcExchangeTax();




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


                $scope.exchanges[1] = response.data;
                $scope.exchanges[1].name = "Negocie Coins"
                $scope.exchanges[1].tax = $scope.taxes.negocieCoins;
                $scope.calcExchangeTax();


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