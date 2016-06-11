
var myApp = angular.module('lightingApp',[]);

myApp.controller('lightingCtrl', ['$scope','$http', '$timeout', function($scope, $http, $timeout) {


    $scope.greeting = 'Hola!';
    $scope.activeOnly = false;
    $scope.color="#388E3C";
    $scope.newForm = {};
    $scope.collection = [];
    $scope.editingMode = false;
    $scope.editingItem = -1;


    /**
     * Initialise the app
     * Pull in data from the DB
     */
    $scope.init = function(){
        $scope.editingItem = -1;
        $http({
            method: 'GET',
            url: '/api/list'
        }).then(function successCallback(response) {
            console.info(response.data);
            $scope.collection = response.data;
            $scope.chromeTabColour();
        });
    };
    $scope.init();



    $scope.updateModel = function(){

       //sockets here

    };

    /**
     * Toggles Editing Mode
     */
    $scope.editMode = function(){
        $scope.editingItem = -1;
        $scope.editingMode = !$scope.editingMode;
    };


    /**
     * Toggles the active only state
     */
    $scope.editActive = function(){
        $scope.activeOnly = !$scope.activeOnly;
    };


    /**
     * Toggles an item on and off
     * @param item the item to toggle
     */
    $scope.toggleItem = function(item){

        if($scope.editingMode){
            $scope.editingItem = item.id;
        }else{
            $scope.efitingItem = -1;

            //Loop through each item
            for(var i=0; i< $scope.collection.length; i++){

                //If this is the item the user wants, switch it's statuss
                if($scope.collection[i].id == item.id) $scope.collection[i].status = !$scope.collection[i].status;

                //Make the API request to turn the light
                $http.post( "/api/switch/"+item.channelNo + "/" + item.switchNo,{"status": (!item.status)}).then(
                    function(response){
                        $scope.updateModel();
                    }
                );

            }

            $scope.updateModel();
        }


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


    /**
     * Deletes the given item
     * @param obj
     */
    $scope.deleteItem = function(obj){

        var conf = confirm("Really delete `" + obj.name + "`?");

        if(conf) {
            $http.post(
                "/api/item/delete/",
                {
                    "obj": obj
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

    /**
     * Inserts a new item, or updates existing one
     * @param obj
     */

    $scope.saveItem = function(obj){

        console.log(obj);
        var url;
        if(obj.id){
            url = "/api/item/update/" ; //got an ID, so update instead
        }else{
            url = "/api/item/new/"; //No ID, so save afresh
        }
        console.log(obj);

        $http.post(
            url,
            {
                "obj": obj
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

}]);


myApp.directive('card', function() {
    return {
        restrict: 'E',
        templateUrl: '/templates/card.html'
    };
});

