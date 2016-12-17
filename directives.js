weatherApp.directive('forecastDirective', function() {
    return {
        restrict: 'E',
        templateUrl: 'pages/forecastDirective.html',
        scope: {
            weatherObject: "=weatherObject",
            convertToDate: "&convertToDate",
            convertToFahrenheit: "&convertToFahrenheit",
            dataFormat: "@"
        },
        replace: true
    }
});
