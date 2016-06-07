/* ======= Model ======= */
// data for places in Orbe
/* ======= ===== ======= */
var localOrbe = [
{
  "name": "La Tour Ronde",
  "location": { "lat": 46.725228, "lng": 6.532651 },
  "category": "Historic Interest",
  "imgSrc": "https://ssl.panoramio.com/photo/55668009",
  "snippet": "The Round Tower is part of the town's ancient castle. It offers splendid 360° panoramic views over the town, the Jura mountain range, and the Alps."
},
{
  "name": "Quartier des Vieux Moulins",
  "location": { "lat": 46.720926, "lng": 6.532467 },
  "category": "Historic Interest",
  "imgSrc": "https://ssl.panoramio.com/photo/74920455",
  "snippet": "The ancient flourmills date back to 1423 and were in use until the very end of the 1990s."
},
{
  "name": "Les Gorges de l'Orbe",
  "location": { "lat": 46.727536, "lng": 6.509110 },
  "category": "Trail",
  "imgSrc": "https://ssl.panoramio.com/photo/55667745",
  "snippet": "A walk through the gorges of the River Orbe presents hikers with a wealth of natural resources in the foothills of the Jura Mountains, between Vallorbe and Orbe."
},
{
  "name": "Mosaïques Romaines",
  "location": { "lat": 46.742346, "lng": 6.535903 },
  "category": "Historic Interest",
  "imgSrc": "https://ssl.panoramio.com/photo/76864223",
  "snippet": "Discovered in the middle of the 19th century, these mosaics paved eight of the 100 rooms in a huge and luxurious Gallo-Roman villa that was built around 160 AD"
},
{
  "name": "Orbe à petits pas",
  "location": { "lat": 46.723168, "lng": 6.529570 },
  "category": "Trail",
  "imgSrc": "https://ssl.panoramio.com/photo/20468692",
  "snippet": "Two easy walks, marked with yellow and red steps on the ground, guide you around the town, its surroundings, and the river."
}
];

/* ======= Google Maps ======= */
// map, infowindow
// initMap()
// createMarker()
// setMarkers()
// setInfoWindow()
/* ======= =========== ======= */

// simple map example from google api
var map;
var initMap = function () {
  map = new google.maps.Map(document.getElementById('map-canvas'), {
    center: {lat: 46.724258, lng: 6.532064},
    zoom: 13
  });
  setMarkers(localOrbe);
};

// create a poi marker add click listener to open info window
function createMarker(poi) {
  var marker = new google.maps.Marker({
    position: {lat: poi.location.lat, lng: poi.location.lng},
    title: poi.name,
    map: map
  });

  marker.addListener('click', function() {
    setInfoWindow(map, marker, poi);
  });
}

// add simple location markers to map
function setMarkers(locations) {
  for (var i = 0; i < locations.length; i++) {
    createMarker(locations[i]);
  }
}

// add simple info window to poi marker
// only want one info window open at a time. use global to keep track of existing window
var infowindow;
function setInfoWindow (map, marker, poi){
  var contentString = '<div id="content">'+
      '<div id="siteNotice">' + '</div>'+
      '<h1 id="firstHeading" class="firstHeading">' + poi.name + '</h1>'+
      '<div id="bodyContent">'+
      '<p><b>' + poi.name + '</b>. ' + poi.snippet +
      '</div>'+
      '</div>';

  // if an open window exists, close it before making new one
  if ( infowindow !== undefined ) infowindow.close();

  infowindow = new google.maps.InfoWindow({
    content: contentString,
    maxWidth: 200
  });
  infowindow.open(map, marker, poi);
}

/* ======= list View ======= */
// Poi() Point of Interest
// observables:
// Poi.name
// Poi.location
// Poi.category
// Poi.imageSrc
// Poi.snippet
/* ======= ========= ======= */

// data is an object literal that contains location data for a single poi in Orbe
var Poi = function(data){
  this.name = ko.observable(data.name);
  this.location = ko.observable(data.location);
  this.category = ko.observable(data.category);
  this.imageSrc = ko.observable(data.imageSrc);
  this.snippet = ko.observable(data.snippet);
};


/* ======= ViewModel ======= */
// ViewModel()
/* ======= =========== ======= */

var ViewModel = function(){
  var self = this;
  // create array of places
  this.locationList = ko.observableArray([]);

  // pass localOrbe object literal data to new Poi
  // loop over the data array and push each new poi into locationList
  // use 'self' to avoid 'this' keyword scope confusion
  localOrbe.forEach(function(poiItem){
    self.locationList.push( new Poi(poiItem) );
  });

// use first poi in Orbe to test selected place
  this.currentPoi = ko.observable(this.locationList()[0].name());
  console.log(this.currentPoi());

  // search section
  // data-bind searchName to the form input in left nav - value: searchName
  // data-bind to update on new letter - valueUpdate: 'afterkeydown'
  this.searchName = ko.observable('');
  this.searchResults = ko.computed(function() {
    var search = self.searchName().toLowerCase();
    return ko.utils.arrayFilter(self.locationList(), function(place) {
      return place.name().toLowerCase().indexOf(search) >= 0;
    });
  });
  console.log(this.searchResults());

};

ko.applyBindings(new ViewModel());