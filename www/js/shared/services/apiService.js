(function () {
    'use strict'

    var serviceModule = angular.module('volunteasy.services');

    serviceModule.factory('apiService', function ($http, $q) {
        var service = {};
        service.baseUrl = 'http://voluntezy.com'

        service.getEvent = function (eventId) {
            var deferred = $q.defer();
            var url = '/event';
            $http({
                method: 'GET',
                url: service.baseUrl + url + '/' + eventId,
                headers: {
                    "Content-Type": "application/json"
                },
                data: ''
            })
            .then(
                function (success) {
                    console.log('apiService - get event');
                    console.log(success);
                    deferred.resolve(success.data);
                },
                function (error) {
                    console.log('apiService - get event failed');
                    console.log(error);
                    deferred.reject();
                }
            )
            return deferred.promise;
        }

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

        service.getLocalEvents = function (lat, long) {
            var deferred = $q.defer();
            var url = '/event/near';
            $http({
                method: 'GET',
                url: service.baseUrl + url + '/' + lat + '/' + long
            })
            .then(
                function (success) {
                    console.log('apiService - get local events');
                    console.log(success);
                    deferred.resolve(success.data);
                },
                function (error) {
                    console.log('apiService - get local events failed');
                    console.log(error);
                    deferred.reject();
                }
            )

            return deferred.promise;
        }

        service.getReport = function (userId) {
            var deferred = $q.defer();
            var url = '/history/report'
            $http({
                method: 'GET',
                url: service.baseUrl + url + '/' + userId
            })
            .then(
                function (success) {
                    console.log('apiService - get report succeded')
                    console.log(success);
                    deferred.resolve(success.data);
                },
                function (error) {
                    console.log('apiService - get report failed')
                    console.log(error);
                    deferred.reject();
                }
            );
            return deferred.promise;
        }

        service.testMethod = function () {
            console.log('apiService - testMethod');
        };


        return service;
    });

})();