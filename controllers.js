weatherApp.controller('homeController', ['$scope', 'cityService', '$location', function($scope, cityService, $location) {
    $scope.city = cityService.city;

    $scope.$watch('city', function() {
        cityService.city = $scope.city;
    });
    $scope.submit = function() {
        $location.path('/forecast');
    }
}]);

weatherApp.controller('forecastController', ['$scope',
    'cityService',
    '$http',
    '$resource',
    '$routeParams',
    function($scope, cityService, $http, $resource, $routeParams) {
        $scope.city = cityService.city;
        $scope.days = $routeParams.days || 2;
        var url = 'http://api.openweathermap.org/data/2.5/forecast/daily';
        $scope.weatherAPI = $resource(url, { callback: 'JSON_CALLBACK' }, {
            get: {
                method: 'JSONP'
            }
        });

        $scope.weatherResult = $scope.weatherAPI.get({
            q: $scope.city,
            cnt: $scope.days,
            appid: 'f0ae30dc0473e56e792d187ce2d81175'
        });

        var options = {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        };
        $scope.convertToFahrenheit = function(degK) {
            var fahrenTemp = Math.round((1.8 * (degK - 273)) + 32);
            return Math.floor((fahrenTemp - 32) * (5 / 9));
        }

        $scope.convertToDate = function(dt) {
            return new Date(dt * 1000);
        }

    }
]);
