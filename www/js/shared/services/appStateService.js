(function () {
    'use strict';

    var serviceModule = angular.module('volunteasy.services');

    serviceModule.factory('appStateService', function ($http, $q) {
        var appStateService = {};

        appStateService.userId = null;


        appStateService.setUser = function (userId) {
            appStateService.userId = userId;
        }

        appStateService.getUserId = function () {
            return appStateService.userId;
        }

        appStateService.loggedIn = function () {
            return appStateService.userId != null;
        }

        appStateService.logOut = function () {
            window.localStorage.removeItem('userId');
            appStateService.userId = null;
        }
        
        return appStateService;
    });
})();