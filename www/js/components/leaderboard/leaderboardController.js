(function () {
    'use strict';

    var controllerModule = angular.module('volunteasy.controllers');

    controllerModule.controller('leaderboardController', function ($scope, apiService, appStateService) {
        $scope.leaderboard = [];

        $scope.$watch(appStateService.loggedIn, function (isLoggedIn) {
            $scope.loggedIn = isLoggedIn;
        });

        $scope.logout = function () { appStateService.logOut(); $state.go('home') };

        apiService.getLeaderboard()
            .then(
            function (data) {
                console.log(data);
                $scope.leaderboard = data;
            },
            function (error) {

            }
        );
    });
})();