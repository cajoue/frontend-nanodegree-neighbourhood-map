// simple map example from google api
var map; // doesn't appear to need to be defined...
var initMap = function () {
  map = new google.maps.Map(document.getElementById('map-canvas'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  });
};

// create link using secret api-key and build script tag to use Google maps api
var loadScript = function (apiKey){
  var JSLink = "https://maps.googleapis.com/maps/api/js?key=" +
  apiKey + "&callback=initMap";
  var JSElement = document.createElement('script');
  JSElement.type = "text/javascript";
  JSElement.src = JSLink;
  JSElement.async;
  JSElement.defer;
  document.getElementsByTagName('head')[0].appendChild(JSElement);
};

$(document).ready(function() {
  var json;
  //start ajax request to retrieve hidden api data for google map
  $.ajax({
    url: "./../config_settings.json",
    //force to handle it as text
    dataType: "text",
    success: function(data) {
      //data downloaded so we call parseJSON function
      //and pass downloaded data
      json = $.parseJSON(data);
      //now json variable contains data in json format
      //console.log(json.GOOGLE_KEY);
      //pass secret key as argument to loadScript
      loadScript(json.GOOGLE_KEY);
    }
  });
});
