(function () {
    'use strict';

    var controllerModule = angular.module('volunteasy.controllers');

    controllerModule.controller('eventController', function ($scope, $stateParams, $cordovaSocialSharing, $timeout, $rootScope, apiService, appStateService) {
        $scope.event = {};

        $scope.zoom = 12;

        $scope.$watch(appStateService.loggedIn, function (isLoggedIn) {
            $scope.loggedIn = isLoggedIn;
            $scope.resizeMap();
        });

        $scope.logout = function () { appStateService.logOut(); $state.go('home') };

        $scope.showMap = true;

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


        apiService.getEvent($stateParams.eventId)
        .then(function (data) {
            $scope.event = data;
        },
        function (error) {

        });
    });
})();