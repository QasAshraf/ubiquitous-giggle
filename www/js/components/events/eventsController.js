(function () {
    'use strict';

    var controllerModule = angular.module('volunteasy.controllers');

    controllerModule.controller('eventsController', function ($scope, apiService) {
        console.log('eventsController init');
        apiService.testMethod();
    });
})();