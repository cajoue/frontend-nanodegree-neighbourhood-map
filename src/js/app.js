// simple map example from google api
var map;
var initMap = function () {
  map = new google.maps.Map(document.getElementById('map-canvas'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  });
};
