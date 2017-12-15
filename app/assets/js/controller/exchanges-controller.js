angular.module("app").controller("ExchangesController", function($scope, $scope, $http, $timeout){

    $scope.interval = 6000;
    $scope.user = {};
    $scope.exchanges = [];
    
    $scope.info = [

        {
            id: 0,
            name: "Bitcoin Trade",
            tax: 0.005,
            endpoint: "https://api.bitcointrade.com.br/v1/public/BTC/ticker/",
            data: "data.data",
            link: "https://www.bitcointrade.com.br/"
        },
        {
            id: 1,
            name: "Negocie Coins",
            tax: 0.005,
            endpoint: "https://broker.negociecoins.com.br/api/v3/btcbrl/ticker",
            data: "data",
            link: "https://www.negociecoins.com.br/"
        },
        {
            id: 2,
            name: "Mercado Bitcoin",
            tax: 0.007,
            endpoint: "https://www.mercadobitcoin.net/api/BTC/ticker/",
            data: "data.ticker",
            link: "https://www.mercadobitcoin.com.br/"
        }
    ];

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

    $scope.dataRequest = function(i){
        var _this = $scope.info[i];
        $http({
            method: 'GET',
            url: _this.endpoint
            }).then(function successCallback(response) {

                console.log(response);
                $scope.exchanges[_this.id] = eval('response.'+_this.data);
                $scope.exchanges[_this.id].name = _this.name;
                $scope.exchanges[_this.id].tax = _this.tax;
                $scope.exchanges[_this.id].link = _this.link;
                $scope.calcExchangeTax();

            }, function errorCallback(response) {
                console.log(response);
            });

            $timeout(function () {
                $scope.dataRequest();
            }, $scope.interval);
    }

    for (var i = 0; i < $scope.info.length; i++) {
        $scope.dataRequest(i);
    }

});