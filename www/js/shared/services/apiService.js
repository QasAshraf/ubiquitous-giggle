(function () {
    'use strict'

    var serviceModule = angular.module('volunteasy.services');

    serviceModule.factory('apiService', function ($http, $q) {
        var service = {};
        service.baseUrl = 'http://hackmcr.papernweb.com'

        service.getAllEvents = function () {
            var deferred = $q.defer();
            var url = '/event/list';
            $http({
                method: 'GET',
                url: service.baseUrl + url
            })
            .then(
                function (success) {
                    console.log('apiService - get all events');
                    console.log(success);
                    deferred.resolve(success.data);
                },
                function (error) {
                    console.log('apiService - get all events failed');
                    console.log(error);
                    deferred.reject();
                }
            )

            return deferred.promise;
        }


        service.testMethod = function () {
            console.log('apiService - testMethod');
        };


        return service;
    });

})();