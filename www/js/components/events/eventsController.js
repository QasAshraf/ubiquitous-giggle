(function () {
    'use strict';

    var controllerModule = angular.module('volunteasy.controllers');

    controllerModule.controller('eventsController', function ($scope, $cordovaGeolocation, $location, $state, apiService, appStateService) {
        $scope.events = [

        ];

        $scope.map = {
            center: {
                latitude: 53.4764,
                longitude: -2.2529
            }, zoom: 12
        };

        $scope.$watch(appStateService.loggedIn, function (isLoggedIn) {
            console.log('loggedin watch');
            console.log(isLoggedIn);
            $scope.loggedIn = isLoggedIn;
        });

        $scope.logout = function () { appStateService.logOut(); $state.go('home') };

        $scope.getLocalEvents = function () {
            var posOptions = { timeout: 1000, enableHighAccuracy: true, maximumAge: 360000 };

            $cordovaGeolocation
              .getCurrentPosition(posOptions)
              .then(function (position) {
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
            for (var i = 0; i < $scope.events.length; i++) {
                if ($scope.events[i].id == marker.id) {
                    $state.go('event', { eventId: $scope.events[i].id });
                }
            }
        }

        $scope.getLocalEvents();


        // Test Logging
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