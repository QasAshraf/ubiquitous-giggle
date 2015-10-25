(function () {
    'use strict';

    var controllerModule = angular.module('volunteasy.controllers');

    controllerModule.controller('reportController', function ($scope, $state, apiService, appStateService) {
        $scope.events = {};

        apiService.getReport('test1')
        .then(
            function (data) {
                $scope.events = data;
            },
            function (error) {

            }
        )

        $scope.$watch(appStateService.loggedIn, function (isLoggedIn) {
            $scope.loggedIn = isLoggedIn;
        });

        $scope.logout = function () { appStateService.logOut();  $state.go('home') };

        $scope.openEvent = function (eventId) {
            console.log('reportController - Event Clicked!');
            for (var i = 0; i < $scope.events.length; i++) {
                if ($scope.events[i].id == eventId) {
                    console.log('reportController - found event');
                    $state.go('event', { eventId: $scope.events[i].id });
                }
            }
        }
    });
})();