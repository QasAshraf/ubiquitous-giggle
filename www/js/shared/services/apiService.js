(function () {
    'use strict'

    var serviceModule = angular.module('volunteasy.services');

    serviceModule.factory('apiService', function ($http, $q) {
        var service = {};

        service.testMethod = function () {
            console.log('apiService - testMethod');
        };


        return service;
    });

})();