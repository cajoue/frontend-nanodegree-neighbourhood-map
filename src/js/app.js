/* ======= Model ======= */
// json data for places in Orbe
/* ======= ===== ======= */
var localOrbe = [
{
  "name": "La Tour Ronde",
  "location": { "lat": 46.725228, "lng": 6.532651 },
  "category": "Historic Site",
  "fourID": "5749d0d7498eeaadc53d1a94",
  "imgSrc": "https://static.panoramio.com.storage.googleapis.com/photos/small/55668009.jpg",
  "snippet": "The Round Tower is part of the town's ancient castle. It offers splendid 360° panoramic views over the town, the Jura mountain range, and the Alps."
},
{
  "name": "Quartier des Vieux Moulins",
  "location": { "lat": 46.720926, "lng": 6.532467 },
  "category": "Scenic Lookout",
  "fourID": "575ee4fe498e32bffe3b201f",
  "imgSrc": "https://static.panoramio.com.storage.googleapis.com/photos/small/74920455.jpg",
  "snippet": "The ancient flourmills date back to 1423 and were in use until the very end of the 1990s."
},
{
  "name": "Les Gorges de l'Orbe",
  "location": { "lat": 46.727536, "lng": 6.509110 },
  "category": "Trail",
  "fourID": "4dfdd71ec65b31579b330f40",
  "imgSrc": "https://static.panoramio.com.storage.googleapis.com/photos/small/55667745.jpg",
  "snippet": "A walk through the gorges of the River Orbe presents hikers with a wealth of natural resources in the foothills of the Jura Mountains, between Vallorbe and Orbe."
},
{
  "name": "Mur d'escalade, Chavornay",
  "location": { "lat": 46.70769, "lng": 6.566871 },
  "category": "Climbing Gym",
  "fourID": "4c74596e1b30a093c380ec09",
  "imgSrc": "https://irs0.4sqi.net/img/general/width960/315239_vFCt6_0yyQJtH2q7LqH93FKYMI8yZUfNvrpSt1jVvDY.jpg",
  "snippet": "The climbing wall at Chavornay is divided into five separate zones, including bouldering, children's area and lead walls."
},
{
  "name": "Orbe à petits pas",
  "location": { "lat": 46.723168, "lng": 6.529570 },
  "category": "Trail",
  "fourID": "4f786a52e4b055c7618c157e",
  "imgSrc": "https://static.panoramio.com.storage.googleapis.com/photos/small/20468692.jpg",
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
  self.fourID = ko.observable(json.fourID);
  self.imageSrc = ko.observable(json.imgSrc);
  self.snippet = ko.observable(json.snippet);
  self.fourWeb = ko.observable();
  // attach the map marker for this Poi object
  self.mapMarker = new google.maps.Marker({
    position: {lat: self.location().lat, lng: self.location().lng},
    title: self.name(),
    animation: google.maps.Animation.DROP,
    map: map
  });
  //  add click handler to marker
  self.mapMarker.addListener('click', function() {
    activateMarker(map, self.mapMarker, self);
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
    zoom: 13
  });
};

// add simple info window to poi marker
// only want one info window open at a time. use global to keep track of existing window
var infowindow;
function setInfoWindow (map, marker, poi){
  var orig = poi.imageSrc();
  var contentString = '<div id="content">'+
  '<div><img id="orbot" width="200" height="150" src="' + poi.imageSrc() +'"></div>' +
  '<div><button class="btn-danger" onclick="getBot()">Orbot... 3 2 1</button>' +
  //'<button class="btn-success" onclick="getOrig('+ orig +')">Whoa... Undo!!</button>' +
  '</div>' +
  '<h4 id="firstHeading" class="firstHeading">' + poi.name() + '</h4>' +
  '<div id="bodyContent">'+
  '<p><b>' + poi.name() + '</b>. ' + poi.snippet() + '</p>' +
  '<p> View on <a href="'+ poi.fourWeb() +'">FourSquare</a></p>' +
  '</div>'+
  '</div>';

  // if an open window exists, close it before making new one
  if ( infowindow !== undefined ) infowindow.close();
  infowindow = new google.maps.InfoWindow({
    content: contentString,
    maxWidth: 220
  });
  infowindow.open(map, marker, poi);
}

function addBounceTimeout(marker) {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function(){ marker.setAnimation(null); }, 2100);
  }
}

// google maps panTo method used to change the center of the map to the given LatLng
function activateMarker(map, marker, poi){
  map.panTo({lat: poi.location().lat, lng: poi.location().lng});
  addBounceTimeout(marker);
  setInfoWindow(map, marker, poi);
}

function resetMarkers(){
  // if an open window exists, close it
  if ( infowindow !== undefined ) infowindow.close();
}

function getBot() {
  var title = document.getElementById("firstHeading").textContent;
  var output = $.ajax({
    url: 'https://robohash.p.mashape.com/index.php?', // The URL to the API. You can get this by clicking on "Show CURL example" from an API profile
    type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
    data: 'text=' + title, // Additional parameters here
    dataType: 'json',
    success: function(data) {
     document.querySelector("#orbot").src = data.imageUrl;
    },
    error: function(err) { alert(err); },
    beforeSend: function(xhr) {
    xhr.setRequestHeader("X-Mashape-Authorization", "VgMGFNmpz7mshANOJu1vyojXxtPSp1EJlqhjsndy1e69V8froV"); // Enter here your Mashape key
    }
  });
}

// I cannot get a reset button to work!
// uncomment line beg <button class="btn-success" in setInfoWindow
// get this error message:
// Uncaught SyntaxError: missing ) after argument list
// ??? seems to refer to index.html <!DOCTYPE html>
function getOrig(imageSrc){
  console.log(imageSrc);
  document.querySelector("#orbot").src = imageSrc;
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



//-------------------------------------------------------------
// FourSquare API
// https://api.foursquare.com/v2/venues/search
// https://api.foursquare.com/v2/venues/explore
// https://api.foursquare.com/v2/venues/VENUE_ID
//-------------------------------------------------------------

// add detail to hardcoded

// For each poi in locationList, request Foursquare data for the infowindow

// example of call to venue_id
// https://api.foursquare.com/v2/venues/40a55d80f964a52020f31ee3?oauth_token=LOJ2DURA4KDE3HIOZH1TP0NAEP1XGIFLQP0FVAE2LHYFFKLR&v=20160613
// based on json output want to narrow in on: data.response.venue
// then drill down to:
// bestPhoto.prefix bestPhoto.suffix perhaps bestPhoto.id
// canonicalUrl
// categories[0].name categories[0].shortName
// id
// location.lat location.lng
// name
// photos.groups[0].items[n].id  .prefix  .suffix
// shortUrl


 var fourInfo = {
      CLIENT_ID: '',
      CLIENT_SECRET: '',
      OAUTH_TOKEN: '',
      baseURL: 'https://api.foursquare.com/v2/venues/'
    };

    // make Ajax request on VENUE_ID to add link supplied by foursquare to each existing poi
/*  self.locationList().forEach(function (poi) {
    $.ajax({
      url: fourInfo.baseURL + poi.fourID(),
      dataType: 'json',
      data: 'client_id=' + fourInfo.CLIENT_ID +
            '&client_secret=' + fourInfo.CLIENT_SECRET +
            '&v=20160613',
      success: function(data){
        console.log(data.response.venue.shortUrl);
        poi.fourWeb(data.response.venue.shortUrl);
      },
      error: function(e){
        console.log('error')
      }
    });
  });*/

// example of call to explore
// https://api.foursquare.com/v2/venues/explore?ll=40.7,-74&oauth_token=LOJ2DURA4KDE3HIOZH1TP0NAEP1XGIFLQP0FVAE2LHYFFKLR&v=20160615
// based on json output want to narrow in on: data.response.groups[0].items
// then drill down to:
// venue.id venue.name
// venue.location.lat venue.location.lng
// venue.featuredPhotos.items[0].prefix .suffix  .id
// venue.categories[0].shortName
// tips[0].canonicalUrl tips[0].text


// make ajax request to find coffee locations around Orbe {lat: 46.724258, lng: 6.532064};
// use resulting json in function to create pois to add to locationlist
// resulting json is not in an easy to use structure. will try getJSON instead
// http://sharepoint.stackexchange.com/questions/116955/create-json-data-dynamically-from-list-using-javascript
  // self.getFourSquarePlaces = function(){
  //   $.ajax({
  //     url: fourInfo.baseURL + 'explore',
  //     dataType: 'json',
  //     data: 'll=46.724258,6.532064&radius=5000&limit=5&venuePhotos=1' +
  //           '&section=coffee' +
  //           '&oauth_token=' + fourInfo.OAUTH_TOKEN +
  //           '&v=20160615',
  //     success: function(data){
  //       console.log(data.response.groups[0].items);
  //       places = data.response.groups[0].items;
  //       //poi.fourWeb(data.response.venue.shortUrl);
  //     },
  //     error: function(e){
  //       console.log('error')
  //     }
  //   });
  // };
  // self.getFourSquarePlaces();

  // resulting json is not in an easy to use structure. will try getJSON instead
  // http://sharepoint.stackexchange.com/questions/116955/create-json-data-dynamically-from-list-using-javascript
  // http://stackoverflow.com/questions/1168807/how-can-i-add-a-key-value-pair-to-a-javascript-object
  // http://stackoverflow.com/questions/8893020/check-if-key-exists-in-json-array-using-jquery
  // Step 1: Get the results
  var exploreURL = fourInfo.baseURL +
                  'explore?ll=46.724258,6.532064&radius=5000&limit=5&venuePhotos=1' +
                  '&section=coffee' +
                  '&oauth_token=' + fourInfo.OAUTH_TOKEN +
                  '&v=20160615';
  $.getJSON(exploreURL, function(data) {
      console.log("Returned JSON Data:");
      console.log(data.response.groups[0].items);
      var gotJSON = data.response.groups[0].items;
      console.log(gotJSON.length);
      // Step 2: Process the results into the form you want
      var results =[];
      for (var i = 0; i < gotJSON.length; i++) {
        var item = {
          "name": gotJSON[i].venue.name,
            "location": { "lat": gotJSON[i].venue.location.lat, "lng": gotJSON[i].venue.location.lng },
            "category": gotJSON[i].venue.categories[0].shortName,
            "fourID": gotJSON[i].venue.id
           // "imgSrc": gotJSON[i].venue.featuredPhotos.items[0].prefix + gotJSON[i].venue.featuredPhotos.items[0].suffix
            //"snippet": gotJSON[i].tips[0].text
        };
        if (gotJSON[i].venue.hasOwnProperty('featuredPhotos')){
          item["imgSrc"] = gotJSON[i].venue.featuredPhotos.items[0].prefix + gotJSON[i].venue.featuredPhotos.items[0].suffix;
        }
        if (gotJSON[i].hasOwnProperty('tips')){
          item["snippet"] = gotJSON[i].tips[0].text;
        }
          results.push(item);
      }
      // do other work with your results below here
      console.log("Object created based on the results:");
      console.log(results);
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
        resetMarkers();
        // show marker
        poi.mapMarker.setVisible(true);
        return results;
      } else {
        // hide marker
        poi.mapMarker.setVisible(false);
      }
    });
  });

// click on list item
  self.setCurrentPoi = function(poi){
    activateMarker(map, poi.mapMarker, poi);
    self.currentPoi(poi.name());
    console.log(self.currentPoi());
  };
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
