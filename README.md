# frontend-nanodegree-neighbourhood-map
Project is part of the [Udacity Front-End Web Developer Nanodegree](https://www.udacity.com/course/front-end-web-developer-nanodegree--nd001)

## Project Overview
A single page responsive application featuring a map of a neighborhood. Additional functionality added to the map includes: map markers to identify popular locations, a search function to easily filter these locations, and a listview to support simple browsing of all locations. Third-party APIs provide both additional information about each of these locations and new locations.

## Application Link
View online here: http://cajoue.github.io/frontend-nanodegree-neighbourhood-map/

## Application Instructions
* click a map marker to view details of the location
* click the hamburger menu to toggle the list of location
* type in the search box to filter the list and the markers
* select a list item to activate the associated marker and view its details

## Project Features
* Map displays markers for neighbourhood points of interest:
    - Outdoors & Activities: trails, scenic lookouts, historic sites, climbing gym
    - Cafés
* [Knockoutjs](http://knockoutjs.com) is a MVVM framework and is used for organization of code and separation of concerns
* Outdoors & Activities are hardcoded json objects in the Model
* Cafés are fetched using [FourSquare API](https://developer.foursquare.com/)
* Map is generated using [Google Maps API](https://developers.google.com/maps/documentation/javascript/) 
* Orbots are for fun and use the [Robohash API](https://market.mashape.com/blaazetech/robohash-image-generator)
* CSS uses the [Bootstrap](http://getbootstrap.com/css/) and [Jasny libraries](http://www.jasny.net/bootstrap/)

## Project Setup & Installation
Clone or download the project here on github
I used [Bower](https://bower.io/) and [Gulp](http://gulpjs.com/) in my workflow
Bower to install and update dependencies
Gulp to automate, lint and minify files for distribution 
All original working files are in the **src** directory
All minified and optimised files are in the **dist** directory


## APIs
* [Google Maps](https://developers.google.com/maps/documentation/javascript/) 
* FourSquare
    - [Explore endpoint](https://developer.foursquare.com/docs/venues/explore)
    - [VENUE_ID endpoint](https://developer.foursquare.com/docs/venues/venues)
* [Robohash Image Generator](https://market.mashape.com/blaazetech/robohash-image-generator)

## Helpful resources
### Ajax & JSON
[Stack Overflow -- How do I return the response from an asynchronous call](http://stackoverflow.com/questions/14220321/how-do-i-return-the-response-from-an-asynchronous-call)

[Stack Overflow -- Create json data dynamically from list using javascript](http://sharepoint.stackexchange.com/questions/116955/create-json-data-dynamically-from-list-using-javascript)

[Stack Overflow -- Check if key exists in JSON array using JQuery](http://stackoverflow.com/questions/8893020/check-if-key-exists-in-json-array-using-jquery)

### APIs
[Udacity Forum -- Api key](https://discussions.udacity.com/t/hiding-google-api-key/170445)

[Mashape - Javascript to consume APIs](http://docs.mashape.com/javascript)

https://developers.google.com/maps/documentation/javascript/tutorial

### Google maps

[Google Maps JavaScript API V3 Reference](https://developers.google.com/maps/documentation/javascript/3.exp/reference)

[Google Developers -- info window](https://developers.google.com/maps/documentation/javascript/examples/infowindow-simple-max)

[Stack Overflow -- Google Maps: Auto close open InfoWindows?](http://stackoverflow.com/a/2224058/6156379)

[Google Maps and Bootstrap 3](http://www.bootply.com/77513)

[Udacity Forum --  Handling Google Maps in Async and Fallback](https://discussions.udacity.com/t/handling-google-maps-in-async-and-fallback/34282)

[Stack Overflow -- Bounce a pin in google maps](http://stackoverflow.com/questions/7339200/bounce-a-pin-in-google-maps-once)

### Gulp
https://www.npmjs.com/package/gulp-filter/

[Stack Overflow -- integrate bower with gulp](http://stackoverflow.com/questions/22901726/how-can-i-integrate-bower-with-gulp-js)

https://www.npmjs.com/package/gulp-useref/
<!-- build:css css/main.min.css -->

https://css-tricks.com/gulp-for-beginners/

https://github.com/jonkemp/gulp-useref/issues/1

### JavaScript
[JavaScript String indexOf() Method](http://www.w3schools.com/jsref/jsref_indexof.asp)

### Knockout
[Knockout Documentation](http://knockoutjs.com/documentation/introduction.html)

[Knockout Tutorials](http://learn.knockoutjs.com/)

[Utility Functions in KnockoutJS](http://www.knockmeout.net/2011/04/utility-functions-in-knockoutjs.html)

[Live search with knockout.js](http://jsfiddle.net/mythical/XJEzc/)

[Toggle CSS class Knockoutjs - JSFiddle](http://jsfiddle.net/sgentile/pRC4c/)
