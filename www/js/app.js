(function () {
    'use strict';

    // Ionic Starter App

    // angular.module is a global place for creating, registering and retrieving Angular modules
    // 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
    // the 2nd parameter is an array of 'requires'
    var app = angular.module('volunteasy', ['ionic', 'volunteasy.controllers', 'volunteasy.services', 'ngCordova','uiGmapgoogle-maps'])


    app.config(function ($stateProvider, $urlRouterProvider, uiGmapGoogleMapApiProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider.state('home',
            {
                url: '/',
                templateUrl: './js/components/events/eventsView.html',
                controller: 'eventsController'
            });

        $stateProvider.state('event',
        {
            url: '/event/:eventId',
            templateUrl: './js/components/event/eventView.html',
            controller: 'eventController'
        });

        uiGmapGoogleMapApiProvider.configure({
            key: 'AIzaSyDM822NfUVm9w2queOI47jx6xBEXKRVuZc',
            v: '3.20', //defaults to latest 3.X anyhow
            libraries: '',
            sensor: 'false'
        });
    });

    app.run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })
})();