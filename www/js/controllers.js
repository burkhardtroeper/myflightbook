angular.module('starter.controllers', [])

.controller('AppCtrl', function($rootScope, $localStorage, $scope) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  delete $localStorage.mfb;

  if ($localStorage.hasOwnProperty('mfb')) {

    console.log("mfb im localstorage gefunden");
    $rootScope.mfb = $localStorage.mfb;

  } else {

    console.log("mfb im localstorage nicht gefunden");
    $rootScope.mfb = {fluege: [], flugzeuge: [], flughafen: []};
    $localStorage.mfb = $rootScope.mfb;

  }

  $rootScope.deleteIcon = false;

  $rootScope.model = {

    showDelete: false,
    showMove: false

  };



})

.controller('startseite', function($rootScope, $scope, $state, data) {

  $rootScope.deleteIcon = false;

  $scope.eingabe = function (eingabe, state) {

    console.log(eingabe);

    $rootScope.deleteIcon = false;

    data.flugeingabe = eingabe;
    data.flugzeugeingabe = eingabe;
    data.flughafeneingabe = eingabe;

    $state.go(state);

  };

})

.controller('flug', function($rootScope, $scope, data) {

  $scope.flug = $rootScope.mfb.fluege;
  $scope.flugzeuge = $rootScope.mfb.flugzeuge;
  $scope.neuFlag = true;
  $scope.editFlag = false;


  $scope.tempeingabe = new data.constructorFluege;

  if (data.flugeingabe) {

    $scope.flugtemplate = "flugeingabe.html";
    $rootScope.deleteIcon = false;

  } else {

    $scope.flugtemplate = "flugausgabe.html";
    $rootScope.deleteIcon = true;

  }

  //data.flugeingabe ? $scope.flugtemplate = "flugeingabe.html" : $scope.flugtemplate = "flugausgabe.html";

  $scope.flugeingabeSpeichern = function () {

    $scope.flugtemplate = "flugausgabe.html";

    if (!$scope.editFlag) {

      $rootScope.mfb.fluege.push($scope.tempeingabe);

    } else {

      $rootScope.mfb.fluege[$scope.aktuellerDatensatz] = $scope.tempeingabe;

    }

    console.log("Eingabe gespeichert");

    $rootScope.deleteIcon = true;

  };

  $scope.flugEditieren = function (index) {

    console.log(index);

    $rootScope.deleteIcon = false;

    $scope.aktuellerDatensatz = index;

    $scope.editFlag = true;
    $scope.neuFlag = true;

    $scope.tempeingabe = $rootScope.mfb.fluege[index];
    $scope.flugtemplate = "flugeingabe.html";

  };

  $scope.neuFlagAendern = function (wert) {

    wert ? $scope.neuFlag = true : $scope.neuFlag = false;

/*    if (wert === true) {
      $scope.neuFlag = true
    } else {
      $scope.neuFlag = false
    }*/

  };

  $scope.deleteFlug = function (index) {

    console.log("at delete " + index);
    $rootScope.mfb.fluege.splice(index, 1);

  };

})

.controller('flugzeug', function($rootScope, $scope, data) {

  $scope.flugzeuge = $rootScope.mfb.flugzeuge;
  $scope.editFlag = false;

  $scope.tempeingabe = new data.constructorFlugzeug;

  if (data.flugzeugeingabe) {

    $scope.flugzeugtemplate = "flugzeugeingabe.html";
    $rootScope.deleteIcon = false;

  } else {

    $scope.flugzeugtemplate = "flugzeugausgabe.html";
    $rootScope.deleteIcon = true;

  }

  data.flugzeugeingabe ? $scope.flugzeugtemplate = "flugzeugeingabe.html" : $scope.flugzeugtemplate = "flugzeugausgabe.html";

  $rootScope.deleteIcon = false;

  $scope.flugzeugeingabeSpeichern = function () {

    console.log($scope.tempeingabe.newAirport);

    if ($scope.tempeingabe.newAirport) {$scope.tempeingabe.onairport.push($scope.tempeingabe.newAirport)}

    if (!$scope.editFlag) {

      $rootScope.mfb.flugzeuge.push($scope.tempeingabe)

    } else {

      $rootScope.mfb.flugzeuge[$scope.aktuellerDatensatz] = $scope.tempeingabe

    }

    $rootScope.deleteIcon = true;

    $scope.flugzeugtemplate = "flugzeugausgabe.html";

  };

  $scope.flugzeugEditieren = function (index) {

    $rootScope.deleteIcon = false;

    $scope.aktuellerDatensatz = index;

    $scope.editFlag = true;

    $scope.tempeingabe = $rootScope.mfb.flugzeuge[index];
    $scope.tempeingabe.newAirport = null;

    console.log($scope.tempeingabe);

    $scope.flugzeugtemplate = "flugzeugeingabe.html";

  };


  $scope.deleteFlugzeug = function (index) {

    console.log("at delete " + index);
    $rootScope.mfb.flugzeuge.splice(index, 1);

  };




})

.controller('flughafen', function($rootScope, $scope, data, NgMap, $ionicModal) {

  $scope.flughafen = $rootScope.mfb.flughafen;
  $scope.editFlag = false;

  $scope.tempeingabe = new data.constructorFlughafen;

  $rootScope.deleteIcon = false;

  $scope.flughafeneingabeStart = function () {

    data.flughafeneingabe ? $scope.flughafentemplate = "flughafeneingabe.html" : $scope.flughafentemplate = "flughafenausgabe.html";

  };

  $scope.flughafenAufKarteSuchen = function () {

    if (!$scope.tempeingabe.icaocode) {

      $scope.openModal();
      $scope.flughafentemplate = "flughafeneingabe.html"

    } else {

      $scope.airportmarkers = [];
      $scope.flughafentemplate = "flughafeneingabe1.html"

    }

  };

  $scope.mapTouched = function (e) {

    $scope.tempLat = e.latLng.lat();
    $scope.tempLng = e.latLng.lng();

    $scope.positions = [{lat:$scope.tempLat , lng:$scope.tempLng}];



    //var latLng = e.latLng;

    //console.log("Lat: " + lat + " - Lng: " + lng);

    //$scope.airportmarkers.push(lat);
    //$scope.airportmarkers.push(lng);

  };

  $scope.mapEingabeSpeichern = function () {

    $scope.tempeingabe.position.push($scope.tempLat);
    $scope.tempeingabe.position.push($scope.tempLng);
    $scope.flughafeneingabeSpeichern();

  };


  $scope.flughafeneingabeCheck = function () {


    $scope.airportSearchString = "airport " + $scope.tempeingabe.city;

    $scope.flughafentemplate = "flughafeneingabe2.html";

    NgMap.getMap().then(function(map) {

      $scope.tempeingabe.position.push(map.markers[0].position.lat());
      $scope.tempeingabe.position.push(map.markers[0].position.lng());

      console.log("Lat: " + $scope.tempeingabe.position[0] + " - Lng: " + $scope.tempeingabe.position[1]);

    });

  };


  $scope.flughafeneingabeSpeichern = function () {

    console.log($scope.tempeingabe);

    if (!$scope.editFlag) {

      $rootScope.mfb.flughafen.push($scope.tempeingabe);

    } else {

      $rootScope.mfb.flughafen[$scope.aktuellerDatensatz] = $scope.tempeingabe;

    }

    $scope.flughafentemplate = "flughafenausgabe.html";

  };

  $scope.flughafenEditieren = function (index) {

    $scope.aktuellerDatensatz = index;

    $scope.editFlag = true;

    $scope.tempeingabe = $rootScope.mfb.flughafen[index];

    console.log($scope.tempeingabe);

    $scope.flughafentemplate = "flughafeneingabe.html";

  };

  // entericaocode.html

  $ionicModal.fromTemplateUrl('entericaocode.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.openModal = function() {
    $scope.modal.show();
  };



  $scope.flughafeneingabeStart();


})

;
