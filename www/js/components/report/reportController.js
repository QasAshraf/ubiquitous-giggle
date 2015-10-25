(function () {
    'use strict';

    var controllerModule = angular.module('volunteasy.controllers');

    controllerModule.controller('reportController', function ($scope, $state, apiService, appStateService) {
        $scope.events = {};


        window.plugins.imei.get(
             function (imei) {
                 $scope.deviceId = imei;
                 console.log($scope.deviceId);
                 apiService.getReport($scope.deviceId)
                    .then(
                        function (data) {
                            $scope.events = data;
                        },
                        function (error) {

                        }
                    )
             },
             function () {
                 console.log("error loading imei");
             }
           );

        $scope.$watch(appStateService.loggedIn, function (isLoggedIn) {
            $scope.loggedIn = isLoggedIn;
        });

        $scope.logout = function () { appStateService.logOut();  $state.go('home') };

        $scope.openEvent = function (eventId) {
            for (var i = 0; i < $scope.events.length; i++) {
                if ($scope.events[i].id == eventId) {
                    $state.go('event', { eventId: $scope.events[i].id });
                }
            }
        }
    });
})();