(function () {
    'use strict';

    var controllerModule = angular.module('volunteasy.controllers');

    controllerModule.controller('eventsController', function ($scope, $cordovaGeolocation, $location, $state, $timeout, $rootScope, apiService, appStateService, uiGmapIsReady) {
        $scope.events = [

        ];

        $scope.map = {
            center: {
                latitude: 53.4764,
                longitude: -2.2529
            }, zoom: 12
        };

        $scope.$watch(appStateService.loggedIn, function (isLoggedIn) {
            $scope.loggedIn = isLoggedIn;
        });

        $scope.showMap = true;


        $rootScope.$on('$stateChangeStart',
        function (event, toState, toParams, fromState, fromParams) {
            if (toState.controller == 'eventsController') {
                $scope.showMap = false;
                $timeout(function () {
                    $scope.showMap = true;
                }, 500)
            }
        })

        
        $scope.logout = function () { appStateService.logOut(); $state.go('home') };
        var getLocalEventsUnscoped = function () {
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
        $scope.getLocalEvents = getLocalEventsUnscoped;

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

        getLocalEventsUnscoped();


        // Test Logging
        //apiService.testMethod();

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