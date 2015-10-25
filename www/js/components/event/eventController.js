(function () {
    'use strict';

    var controllerModule = angular.module('volunteasy.controllers');

    controllerModule.controller('eventController', function ($scope, $stateParams, $cordovaSocialSharing, $timeout, $rootScope, apiService, appStateService) {
        $scope.event = {};

        $scope.zoom = 12;

        $scope.$watch(appStateService.loggedIn, function (isLoggedIn) {
            $scope.loggedIn = isLoggedIn;
        });

        $scope.logout = function () { appStateService.logOut(); $state.go('home') };

        $scope.showMap = true;
        $scope.notGoing = false;

        $rootScope.$on('$stateChangeStart',
        function (event, toState, toParams, fromState, fromParams) {
            if (toState.controller == 'eventController') {
                $scope.showMap = false;
                $timeout(function () {
                    $scope.showMap = true;
                }, 500)
            }
        })


        $scope.twitterShare = function () {
            var message = 'Im going to ' + $scope.event.name;

            if (message.length >= 129)
                message = message.substring(0, 126) + '...';

            message = message + ' #Voluntezy';

            $cordovaSocialSharing
                .shareViaTwitter(message)
                .then(
                    function (success) {
                        console.log('eventController - twitter share completed');
                        console.log(success);
                    },
                    function (error) {
                        console.log('eventController - twitter share failed');
                        console.log(error);
                    }
                );
        };

        $scope.share = function () {
            var message = 'Im going to ' + $scope.event.name;

            if (message.length >= 129)
                message = message.substring(0, 126) + '...';

            message = message + ' #Voluntezy';

            $cordovaSocialSharing
                .share(message)
                .then(
                    function (success) {
                        console.log('eventController - share completed');
                        console.log(success);
                    },
                    function (error) {
                        console.log('eventController - share failed');
                        console.log(error);
                    }
                );
        };

        $scope.checkIn = function () {
            apiService.checkInEvent($scope.event.id, appStateService.getUserId())
            .then(
                function (success) {

                },
                function (error) {

                }
            );
        }

        $scope.map = {
            center: {
                latitude: 53.4764,
                longitude: -2.2529
            },
            zoom: 12
        };

        apiService.getEvent($stateParams.eventId)
        .then(function (data) {
            $scope.notGoing = true;
            if ($scope.loggedIn && data.checkins !== undefined) {
                var userId = appStateService.getUserId();
                for (var i = 0; i < data.checkins.length; i++) {
                    if (data.checkins[i].user.username == userId) {
                        $scope.notGoing = false;
                        break;
                    }
                }
            }

            $scope.map.center = data.location;
            $scope.event = data;
        },
        function (error) {

        });
    });
})();