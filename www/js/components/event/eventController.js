(function () {
    'use strict';

    var controllerModule = angular.module('volunteasy.controllers');

    controllerModule.controller('eventController', function ($scope, $stateParams, $cordovaSocialSharing, $timeout, $rootScope, apiService, appStateService) {
        $scope.event = {};

        $scope.$watch(appStateService.loggedIn, function (isLoggedIn) {
            $scope.loggedIn = isLoggedIn;
        });

        $scope.logout = function () { appStateService.logOut(); $state.go('home') };

        $scope.notGoing = false;


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
                    $scope.notGoing = false;
                },
                function (error) {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Error!',
                        template: 'We were unable to check you in, try again later'
                    });
                    alertPopup.then(function (res) {

                    });
                }
            );
        }

        
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
            $scope.event = data;
        },
        function (error) {

        });
    });
})();