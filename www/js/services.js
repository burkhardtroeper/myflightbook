/**
 * Created by axel on 19.04.16.
 */
angular.module('services', [])
.service('data', function() {

  var self = this;

  self.flugeingabe = true;
  self.flugzeugeingabe = true;
  self.flughafeneingabe = true;

  // Constructor Flüge
  self.constructorFluege = function () {

    this.zeitstempel = moment();
    this.uhrzeit = moment(this.zeitstempel).format('HH:mm');
    this.datum = moment(this.zeitstempel).format('DD.MM');
    this.von = null;
    this.vonWindrichtung = null;
    this.vonWindstaerke = null;
    this.nach = null;
    this.nachWindrichtung = null;
    this.nachWindstaerke = null;
    this.entfernung = null;
    this.flugzeug = false;
    this.flugroute = null;
    this.departure = null;
    this.arrival = null;

  };

  // Constructor Flugzeug
  self.constructorFlugzeug = function () {

    this.modeltyp = null;
    this.airline = null;
    this.onairport = [];
    this.newAirport = null;

  };

  // Constructor Flughafen
  self.constructorFlughafen = function () {

    this.icaocode = null;
    this.city = null;
    this.position = [];

  };

});
