(function () {
    'use strict';

    var controllerModule = angular.module('volunteasy.controllers');

    controllerModule.controller('eventsController', function ($scope, $cordovaGeolocation, apiService) {
        $scope.events = [

        ];

        $scope.getLocalEvents = function () {
            console.log('eventsController - Getting local events');
            var posOptions = { timeout: 1000, enableHighAccuracy: true, maximumAge: 360000 };

            $cordovaGeolocation
              .getCurrentPosition(posOptions)
              .then(function (position) {
                  console.log('eventsController - Got location:');
              }, function (err) {
                  console.log('eventsController - Couldn\'t get location:');
              });
        }

        $scope.getAllEvents = function () {
            apiService.getAllEvents()
                .then(function (success) {
                    $scope.events = success;
                  },
                  function (error) {

                  }
                );
        }


        // Test Logging
        console.log('eventsController init');
        apiService.testMethod();

        //Test Data
        var testEventData = [
            {
                id: 1,
                name: "event1",
                location: {
                    lat: "0.123456789",
                    long: "0.123456789"
                }
            },
            {
                id: 2,
                name: "event2",
                location: {
                    lat: "0.123456789",
                    long: "0.123456789"
                }
            }
        ];
        $scope.loadTestData = function () {
            $scope.events = testEventData;
        }

    });
})();