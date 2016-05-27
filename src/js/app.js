var map;

var loadScript = function (){
  var myAPIKey = "xxxx"
  var JSLink = "https://maps.googleapis.com/maps/api/js?key=" +
      myAPIKey + "&callback=initMap";

  var JSElement = document.createElement('script');
  JSElement.type = "text/javascript"
  JSElement.src = JSLink;
  JSElement.async;
  JSElement.defer;
  document.getElementsByTagName('head')[0].appendChild(JSElement);
}

var initMap = function () {
  map = new google.maps.Map(document.getElementById('map-canvas'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  });
}

loadScript();
initMap();



