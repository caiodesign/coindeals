angular.module("app").controller("ExchangesController", function($scope, $scope, $http, $timeout){

    $scope.interval = 6000;
    $scope.user = {};

    $scope.info = {

        bitCoinTrade: {
            tax: 0.005,
            link: "https://www.bitcointrade.com.br/"
        },
        negocieCoins: {
            tax: 0.005,
            link: "https://www.negociecoins.com.br/"
        },
        mercadoBitcoin: {
            tax: 0.007,
            link: "https://www.mercadobitcoin.com.br/"
        }
    }

    $scope.bestExchange = {
        is: null
    }

    $scope.exchanges = [];

    

    $scope.calcExchangeTax = function () {
        
        if($scope.user.money != undefined){
            for (var i = 0; i < $scope.exchanges.length; i++) {
                var exchange = $scope.exchanges[i];
    
                exchange.noTax = $scope.user.money / exchange.buy;
                exchange.totalTax = exchange.noTax * exchange.tax;
                exchange.withTax = exchange.noTax - exchange.totalTax;
    
                var d = i - 1;
    
                if(i == 0){
                    exchange.bestValue = true;
                } else {
                    if(exchange.withTax > $scope.exchanges[d].withTax){
                        $scope.exchanges[d].bestValue = false;
                        exchange.bestValue = true;
                    }
                }
    
            }
        }

    }
       
    $scope.getBitCoinTrade = function(){

        $http({
            method: 'GET',
            url: 'https://api.bitcointrade.com.br/v1/public/BTC/ticker/'
            }).then(function successCallback(response) {

                $scope.exchanges[0] = response.data.data;
                $scope.exchanges[0].name = "Bitcoin Trade";
                $scope.exchanges[0].tax = $scope.info.bitCoinTrade.tax;
                $scope.exchanges[0].link = $scope.info.bitCoinTrade.link;
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
                console.log($scope.exchanges[1]);
                $scope.exchanges[1].name = "Negocie Coins"
                $scope.exchanges[1].tax = $scope.info.negocieCoins.tax;
                $scope.exchanges[1].link = $scope.info.negocieCoins.link;
                $scope.calcExchangeTax();


            }, function errorCallback(response) {
                console.log(response);
            });
            $timeout(function () {
                $scope.getNegocieCoins();
            }, $scope.interval);
    }

    $scope.getMercadoBitcoin = function () {
        $http({
            method: 'GET',
            url: 'https://www.mercadobitcoin.net/api/BTC/ticker/'
            }).then(function successCallback(response) {

                $scope.exchanges[2] = response.data.ticker;
                $scope.exchanges[2].name = "Mercado Bitcoin";
                $scope.exchanges[2].tax = $scope.info.mercadoBitcoin.tax;
                $scope.exchanges[2].link = $scope.info.mercadoBitcoin.link;
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
    $scope.getMercadoBitcoin();

});