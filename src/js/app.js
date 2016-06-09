/* ======= Model ======= */
// json data for places in Orbe
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

/* ======= list View ======= */
// Poi() Point of Interest
// observables:
// Poi.name
// Poi.location
// Poi.category
// Poi.imageSrc
// Poi.snippet
/* ======= ========= ======= */

// json is an object literal that contains location data for a single poi in Orbe
// Poi is an object constuctor for a single place of interest
var Poi = function(json){
  var self = this;
  self.name = ko.observable(json.name);
  self.location = ko.observable(json.location);
  self.category = ko.observable(json.category);
  self.imageSrc = ko.observable(json.imageSrc);
  self.snippet = ko.observable(json.snippet);
  // attach the map marker for this Poi object
  self.mapMarker = new google.maps.Marker({
    position: {lat: self.location().lat, lng: self.location().lng},
    title: self.name(),
    animation: google.maps.Animation.DROP,
    map: map
  });
  //  add click handler to marker
  self.mapMarker.addListener('click', function() {
    setInfoWindow(map, self.mapMarker, self);
    addBounceTimeout(self.mapMarker);
    // toggleBounce(self.mapMarker);
  });
};


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
  const ORBE = {lat: 46.724258, lng: 6.532064};
  map = new google.maps.Map(document.getElementById('map-canvas'), {
    center: ORBE,
    // center: {lat: 46.724258, lng: 6.532064},
    zoom: 13
  });
};

// add simple info window to poi marker
// only want one info window open at a time. use global to keep track of existing window
var infowindow;
function setInfoWindow (map, marker, poi){
  var contentString = '<div id="content">'+
  '<div id="siteNotice">' + '</div>'+
  '<h1 id="firstHeading" class="firstHeading">' + poi.name() + '</h1>'+
  '<div id="bodyContent">'+
  '<p><b>' + poi.name() + '</b>. ' + poi.snippet() +
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

function toggleBounce(marker) {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}

function addBounceTimeout(marker) {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function(){ marker.setAnimation(null); }, 2100);
  }
}




/* ======= ViewModel ======= */
// ViewModel()
/* ======= =========== ======= */

var ViewModel = function(){
  var self = this;
  // create array of places
  self.locationList = ko.observableArray([]);
  self.searchName = ko.observable('');

  // pass localOrbe object literal json data to new Poi
  // loop over the json array and push each new poi into locationList
  // use 'self' to avoid 'this' keyword scope confusion
  localOrbe.forEach(function(json){
    self.locationList.push( new Poi(json) );
  });

  // use first poi in Orbe to test selected place
  self.currentPoi = ko.observable(this.locationList()[0].name());
  console.log(self.currentPoi());

  // search section
  // data-bind searchName to the form input in left nav - value: searchName
  // data-bind to update on new letter - valueUpdate: 'afterkeydown'
  // setVisible is a method on google marker
  self.searchResults = ko.computed(function() {
    var results = [];
    // use value in search box
    var search = self.searchName().toLowerCase();
    // string match for each poi.name in the location list
    return ko.utils.arrayFilter(self.locationList(), function(poi) {
      if (poi.name().toLowerCase().indexOf(search) >= 0){
        results.push(poi);
        // show marker
        poi.mapMarker.setVisible(true);
        return results;
      } else {
        // hide marker
        poi.mapMarker.setVisible(false);
      }
    });
  });
  console.log(this.searchResults());
};


// If call to google maps api successful create viewmodel and apply bindings
function googleSuccess() {
  if (typeof google !== 'undefined') {
    initMap();
    ko.applyBindings(new ViewModel());
  }
  else {
    googleError();
  }
};

// Error handling for the Google Maps
var googleLoadError = function() {
  alert('Google maps load error');
};
