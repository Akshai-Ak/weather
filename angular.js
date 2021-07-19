let app=angular.module('app',['ngRoute']);

app.config(function ($routeProvider){

    $routeProvider
    .when('/',{
        templateUrl:'home.html',
        controller:'homeController'
    })
    .when('/forecast',{
        templateUrl:'forecast.html',
        controller:'forecastController'
    })
})
app.service('cityService',function(){
    this.city="chennai"
})
app.controller('homeController',['$scope','cityService',function($scope,cityService){
  /*   $scope.city=cityService.city; */
    $scope.$watch('city',function(){
        cityService.city=$scope.city
    })
}])
app.controller('forecastController',['$scope','cityService','$http',function($scope,cityService,$http){
    $scope.city=cityService.city;
    $http.get(`https://api.openweathermap.org/data/2.5/weather?q=${$scope.city}&appid=4df5253e4bdf7bbb6b4281362c66879f`).then(function(response){
        $scope.result=response.data;
        console.log( $scope.result);
    })
    $scope.convertToDate=function(dt){
        return new Date(dt*1000)
    }
    $scope.convertTemp=function(degk){
        return Math.round((degk-273.15))
    }
}])

































