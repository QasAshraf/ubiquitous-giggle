(function () {
    'use strict'

    var controllerModule = angular.module('volunteasy.controllers');

    controllerModule.controller('badgeController', function ($scope, apiService, appStateService) {
        $scope.user = {};

        $scope.badges = [];

        $scope.$watch(appStateService.loggedIn, function (isLoggedIn) {
            $scope.loggedIn = isLoggedIn;
        });

        $scope.logout = function () { appStateService.logOut(); $state.go('home') };

        apiService.getUser(appStateService.getUserId())
            .then(
            function (data) {
                console.log(data);
                
                if (data.checkins >= 10) {
                    $scope.badges.push({
                        number: 10,
                        description: "Attended 10 volunteering events"
                    });
                }

                if (data.checkins >= 20) {
                    $scope.badges.push({
                        number: 20,
                        description: "Attended 20 volunteering events"
                    });
                }

                if (data.checkins >= 50) {
                    $scope.badges.push({
                        number: 50,
                        description: "Attended 50 volunteering events"
                    });
                }

                if (data.checkins >= 100) {
                    $scope.badges.push({
                        number: 100,
                        description: "Attended 100 volunteering events"
                    });
                }
                
                $scope.user = data;
                console.log($scope.badges);
            },
            function (error) {

            }
        );

    });
})();