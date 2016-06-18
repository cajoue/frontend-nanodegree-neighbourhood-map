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

### Get the git

 - Fork, clone or download the project here on github. Use git to clone
   the repository to your local system 
 - open terminal 
 - Navigate to the    parent directory in which you intend to install
   the project
 - `$ git clone https://github.com/cajoue/frontend-nanodegree-neighbourhood-map.git`

This will create, and install files to, the project directory **frontend-nanodegree-neighbourhood-map** 

### Project Build
I used [npm](https://nodejs.org/en/), [bower](https://bower.io/) and [gulp](http://gulpjs.com/) in my workflow
Bower to install and update dependencies
Gulp to automate, lint and minify files for distribution 
All original working files are in the **src** directory
All minified and optimised files are in the **dist** directory once built

**Required**:  npm (part of nodeJs), gulp and bower
If not already on your system you will need to download and install them, using Terminal (on mac)

- Instructions for [Installing Node.js and updating npm](https://docs.npmjs.com/getting-started/installing-node)

- Install Bower
`$ npm install -g bower`

- Install Gulp
`$ npm install -g gulp`


#### Install Dependencies

In the Terminal, in the root of the project directory (*frontend-nanodegree-neighbourhood-map*)

- `$ bower install`
installs the project dependencies listed in bower.json

- `$ npm install `
installs the required node-modules for gulp
listed as dependencies in package.json (includes gulp)

#### Working with Gulp
- `$ gulp build` 
to clear dist directory if it exists and rebuild from scratch from files in the src directory and bower components.

- `$ gulp`
gulp default task. This launches a preview of the actual development build located in the dist/ directory. Files in the src/ directory are watched, if any changes are made gulp tasks are run and the app is automatically updated in the browser. The stream is dependent on browser-sync. 

### Run on local Server
- open terminal
- Navigate to the root of the project directory 
- `$ python -m SimpleHTTPServer 8080 `
to run on port 8080 

- open browser (http://localhost:8080/)
- Navigate to:
**/src/index.html** 
to open the source docs (working files before optimisation - easier to view, edit, or debug the code)
- or:
**/dist/index.html** 
to open the distribution application (optimised files for production use)

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

https://discussions.udacity.com/t/project-rejected-problem-with-gulpfile-tasks-not-working-consistently/173761

https://www.browsersync.io/docs/gulp/

http://stackoverflow.com/questions/32017406/gulp-sass-and-browser-sync-dont-reload-browser/32017530#32017530

https://css-tricks.com/gulp-for-beginners/

https://github.com/zellwk/gulp-starter-csstricks/blob/master/gulpfile.js


### JavaScript
[JavaScript String indexOf() Method](http://www.w3schools.com/jsref/jsref_indexof.asp)

### Knockout
[Knockout Documentation](http://knockoutjs.com/documentation/introduction.html)

[Knockout Tutorials](http://learn.knockoutjs.com/)

[Utility Functions in KnockoutJS](http://www.knockmeout.net/2011/04/utility-functions-in-knockoutjs.html)

[Live search with knockout.js](http://jsfiddle.net/mythical/XJEzc/)

[Toggle CSS class Knockoutjs - JSFiddle](http://jsfiddle.net/sgentile/pRC4c/)

### Thank yous
To the generous people on the forums for their thoughtful and helpful advice - my last reviewer too!