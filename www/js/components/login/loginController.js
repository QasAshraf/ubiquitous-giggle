(function () {
    'use strict'

    var controllerModule = angular.module('volunteasy.controllers');

    controllerModule.controller('loginController', function ($scope, $ionicPopup, apiService, appStateService) {
        $scope.loginDetails = {
            email: ""
        };

        $scope.login = function () {
            apiService.login($scope.loginDetails.email)
            .then(
                function (success) {
                    appStateService.setUser($scope.loginDetails.email);
                    window.localStorage['userId'] = $scope.loginDetails.email;
                },
                function (error) {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Error!',
                        template: 'You are not registered.'
                    });
                    alertPopup.then(function (res) {

                    });
                }
            );
        };

    });
})();