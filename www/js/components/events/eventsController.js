(function () {
    'use strict';

    var controllerModule = angular.module('volunteasy.controllers');

    controllerModule.controller('eventsController', function ($scope, $cordovaGeolocation, $location, $state, apiService) {
        $scope.events = [

        ];

        $scope.map = {
            center: {
                latitude: 53.4764,
                longitude: -2.2529
            }, zoom: 8
        };

        $scope.getLocalEvents = function () {
            console.log('eventsController - Getting local events');
            var posOptions = { timeout: 1000, enableHighAccuracy: true, maximumAge: 360000 };

            $cordovaGeolocation
              .getCurrentPosition(posOptions)
              .then(function (position) {
                  console.log('eventsController - Got location:');
                  var lat = position.coords.latitude
                  var long = position.coords.longitude
                  apiService.getLocalEvents(lat, long)
                  .then(function (data) {
                      $scope.events = data
                  },
                    function (error) {

                    }
                  );
              }, function (err) {
                  console.log('eventsController - Couldn\'t get location:');
              });
        }

        $scope.getAllEvents = function () {
            apiService.getAllEvents()
                .then(function (data) {
                    $scope.events = data;
                },
                  function (error) {

                  }
                );
        }

        $scope.markerClick = function (marker) {
            console.log('eventsController - Marker Clicked!');
            for (var i = 0; i < $scope.events.length; i++) {
                console.log('markerid: ' + marker.id);
                console.log('eventId: ' + $scope.events[i].id);
                console.log('compare: ' + ($scope.events[i].id == marker.id) );
                if ($scope.events[i].id == marker.id) {
                    console.log('eventsController - found event');
                    $state.go('event', { eventId: $scope.events[i].id });
                }
            }
        }

        $scope.getLocalEvents();


        // Test Logging
        console.log('eventsController init');
        apiService.testMethod();

        //Test Data
        var testEventData = [
            {
                id: 1,
                name: "event1",
                location: {
                    latitude: "53.4764",
                    longitude: "-2.2529"
                },
                options: {
                    label: "event 1"
                }
            },
            {
                id: 2,
                name: "event2",
                location: {
                    latitude: "53.5764",
                    longitude: "-2.3545"
                },
                options: {
                    label: "event 2"
                }
            }
        ];
        $scope.loadTestData = function () {
            $scope.events = testEventData;
        }

    });
})();