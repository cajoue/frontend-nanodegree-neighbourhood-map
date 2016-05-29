// data for places in Orbe
var localOrbe = [
{
  "name": "La Tour Ronde",
  "location": { "lat": 46.725228, "lng": 6.532651 },
  "category": "Historic Interest",
  "image-url": "https://ssl.panoramio.com/photo/55668009",
  "snippet": "The Round Tower is part of the town's ancient castle. It offers splendid 360° panoramic views over the town, the Jura mountain range, and the Alps."
},
{
  "name": "Moulins Rod",
  "location": { "lat": 46.720926, "lng": 6.532467 },
  "category": "Historic Interest",
  "image-url": "https://ssl.panoramio.com/photo/74920455",
  "snippet": "The ancient flourmills date back to 1423 and were in use until the very end of the 1990s."
},
{
  "name": "Les Gorges de l'Orbe",
  "location": { "lat": 46.727536, "lng": 6.509110 },
  "category": "Trail",
  "image-url": "https://ssl.panoramio.com/photo/55667745",
  "snippet": "A walk through the gorges of the River Orbe presents hikers with a wealth of natural resources in the foothills of the Jura Mountains, between Vallorbe and Orbe."
}
];

// simple map example from google api
var map;
var initMap = function () {
  map = new google.maps.Map(document.getElementById('map-canvas'), {
    center: {lat: 46.724258, lng: 6.532064},
    zoom: 14
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
  };
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
  if ( infowindow != null ) infowindow.close();

  infowindow = new google.maps.InfoWindow({
    content: contentString,
    maxWidth: 200
  });
  infowindow.open(map, marker, poi);
}


