(function () {
    'use strict';

    var controllerModule = angular.module('volunteasy.controllers');

    controllerModule.controller('eventController', function ($scope, $stateParams, apiService) {
        $scope.event = {};

        $scope.zoom = 12;

        apiService.getEvent($stateParams.eventId)
        .then(function (data) {
            $scope.event = data;
        },
        function (error) {

        });
    });
})();