(function () {
    'use strict';

    var controllerModule = angular.module('volunteasy.controllers');

    controllerModule.controller('registerController', function ($scope, $ionicPopup, $state, apiService, appStateService) {
        $scope.registerDetails = {
            email: ""
        };

        $scope.deviceId = 'deviceId';

        $scope.$watch(appStateService.loggedIn, function (isLoggedIn) {
            $scope.loggedIn = isLoggedIn;
        });

        $scope.logout = function () { appStateService.logOut(); $state.go('home') };


        $scope.register = function () {
            apiService.register($scope.registerDetails.email, $scope.deviceId)
            .then(
                function () {
                    appStateService.setUser($scope.registerDetails.email);
                    window.localStorage['userId'] = $scope.registerDetails.email;
                    var alertPopup = $ionicPopup.alert({
                        title: 'Success!',
                        template: 'You have registered'
                    });
                    alertPopup.then(function (res) {

                    });
                },
                function (error) {

                }
            );
        }

    });
})();