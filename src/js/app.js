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
    zoom: 15
  });
  setMarkers(map);
};

// add simple markers to map
function setMarkers(map) {
  for (var i = 0; i < localOrbe.length; i++) {
    var poi = localOrbe[i];
    var marker = new google.maps.Marker({
      position: {lat: poi.location.lat, lng: poi.location.lng},
      map: map,
      title: poi.name
    });
  };
}

