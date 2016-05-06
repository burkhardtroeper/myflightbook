// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngStorage', 'starter.controllers', 'services', 'ngMap', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

  $httpProvider.defaults.headers.common['Authorization'] = 'Token 20002cd74d5ce124ae219e739e18956614aab490';

  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.flug', {
    url: '/flug',
    views: {
      'menuContent': {
        templateUrl: 'templates/flug.html',
        controller: 'flug'
      }
    }
  })

  .state('app.flugzeug', {
    url: '/flugzeug',
    views: {
      'menuContent': {
        templateUrl: 'templates/flugzeug.html',
        controller: 'flugzeug'
      }
    }
  })

  .state('app.flughafen', {
    url: '/flughafen',
    views: {
      'menuContent': {
        templateUrl: 'templates/flughafen.html',
        controller: 'flughafen'
      }
    }
  })

  .state('app.startseite', {
    url: '/startseite',
    views: {
      'menuContent': {
        templateUrl: 'templates/startseite.html',
        controller: 'startseite'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/startseite');
});
