const SWITCH = 0;
const TOGGLE = 1;

var myApp = angular.module('lightingApp', []);

myApp.controller('lightingCtrl', ['$scope', '$http', function ($scope, $http) {

    $scope.greeting = 'Hola!';
    $scope.activeOnly = false;
    $scope.color = "#388E3C";

    $scope.collection = [new Item("LED lights", SWITCH, 1, 1), new Item("Spotlights", SWITCH, 1, 2), new Item("Fan", SWITCH, 1, 3), new Item("Immersion Heater", SWITCH, 1, 4)];

    $scope.alterState = function (item) {

        item.status = !item.status;
        var str = item.channelNo + "" + item.switchNo + (item.status ? '1' : '0');
        console.log(str);
        $http.jsonp("http://lighting.416.home", {
            params: { "s": str }
        });

        var allOff = true;
        $scope.collection.forEach(function (e) {
            if (e.status) allOff = false;
        });
        if (allOff) {
            $scope.color = "#388E3C";
        } else {
            $scope.color = "#d32f2f";
        }
    };

    $scope.filter = function (item) {

        if ($scope.activeOnly) {
            return item.status;
        }

        return true;
    };
}]); /**
     * Created by criches on 01/06/2016.
     */

//# sourceMappingURL=controller-compiled.js.map