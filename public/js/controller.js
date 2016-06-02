
var myApp = angular.module('lightingApp',[]);

myApp.controller('lightingCtrl', ['$scope','$http', '$timeout', function($scope, $http, $timeout) {


    $scope.greeting = 'Hola!';
    $scope.activeOnly = false;
    $scope.color="#388E3C";
    $scope.newForm = {};
    $scope.collection = [];


    /**
     * Initialise the app
     * Pull in data from the DB
     */
    $scope.updateModel = function(){

        $http({
            method: 'GET',
            url: '/api/list'
        }).then(function successCallback(response) {
            console.info(response.data);
            $scope.collection = response.data;
        });

    };
    $scope.updateModel();


    $scope.alterState = function(item){

        var str = item.channelNo + "" + item.switchNo + (item.status?'0':'1');
        $http.jsonp("http://lighting.416.home", {
            params: { "s": str }
        });

        $http.post(
            "/api/switch/"+item.channelNo + "/" + item.switchNo,
            {
                 "status": (!item.status)
            }
        ).then(
            function(response){
                $scope.updateModel();
            },
            function(response){
                // failure callback
                $scope.updateModel();
            }
        );

        $scope.chromeTabColour();


    };


    /**
     * On mobile Chrome, it's possible to change the tab colour.
     * This changes it green if all is off, red otherwise.
     */
    $scope.chromeTabColour = function(){
        var allOff = true;
        $scope.collection.forEach(function(e){
            if(e.status)allOff=false;
        });
        if(allOff){
            $scope.color="#388E3C";
        }else{
            $scope.color="#d32f2f";
        }

    };

    $scope.filter = function(item){

        if($scope.activeOnly){
            return item.status;
        }


        return true;
    };

    $scope.clearForm=function(obj){
        obj = {};
    };

    $scope.deleteItem = function(obj){

        var conf = confirm("Really delete `" + obj.name + "`?");

        if(conf) {
            $http.post(
                "/api/item/delete/",
                {
                    "id": obj._id
                }
            ).then(
                function (response) {
                    $scope.updateModel();
                },
                function (response) {
                    // failure callback
                    $scope.updateModel();
                }
            );
        }
    };


    $scope.addNewItem = function(obj){
        $http.post(
            "/api/item/new/",
            {
                "name": obj.name,
                "channelNo": obj.channelNo,
                "switchNo": obj.switchNo
            }
        ).then(
            function(response){
                $scope.updateModel();
                $scope.clearForm();
            },
            function(response){
                // failure callback
                $scope.updateModel();
            }
        );

    };


    $scope.holdTimer = false;
    $scope.startTimer = function(callback){
        $scope.stopTimer();
        $scope.holdTimer = $timeout(function(){callback;},50000);
    };
    $scope.stopTimer = function(){
        $timeout.cancel($scope.holdTimer);
    };
    $scope.longPress = function(obj){

    };




}]);


myApp.directive('card', function() {
    return {
        restrict: 'E',
        templateUrl: '/templates/card.html'
    };
});

