//---------------------------//
//       Thanks & Refs       //
//---------------------------//

// fellow udacian rogyw for his thoughts and suggestions on Slack and the Forum (thanks also to Forum mentor andrew_R)
// https://discussions.udacity.com/t/project-rejected-problem-with-gulpfile-tasks-not-working-consistently/173761
// https://www.browsersync.io/docs/gulp/
// http://stackoverflow.com/questions/32017406/gulp-sass-and-browser-sync-dont-reload-browser/32017530#32017530

// To ensure that one task completes before the next use a plugin called RunSequence.
// https://css-tricks.com/gulp-for-beginners/

// reworked gulpfile based on the css-tricks gulp starter code found here:
// https://github.com/zellwk/gulp-starter-csstricks/blob/master/gulpfile.js

//---------------------------//
//       Configuration       //
//---------------------------//
var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    cleanCSS = require('gulp-clean-css'),
    sourcemap = require('gulp-sourcemaps'),
    minifyhtml = require('gulp-minify-html'),
    ghPages = require('gulp-gh-pages'),
    rename = require('gulp-rename'),
    mainBowerFiles = require('main-bower-files'),
    gulpFilter = require('gulp-filter'),
    jshint = require('gulp-jshint'),
    useref = require('gulp-useref'),
    strip = require('gulp-strip-comments'),
    runSequence = require('run-sequence'),
    cache = require('gulp-cache'),
    del = require('del');

var srcPath = 'src/'; // Path to source files
var distPath = 'dist/'; // Path to distribution files

//--| END OF Configuration |--//

//---------------------------//
//      vendorComponents     //
//---------------------------//
// requires:
//   gulp-filter
//   main-bower-files
//   gulp-uglify
//   gulp-clean-css
//   gulp-rename
//   gulp-browser-sync
//---------------------------//
// Run when add any new bower packages installed (hopefully automated now that in 'serve')
// grab main files from mainBowerFiles, push to srcPath for working directory
// and also minify and push in distPath
// http://stackoverflow.com/questions/22901726/how-can-i-integrate-bower-with-gulp-js
// note in project bower.json overrides are required for bootstrap: https://github.com/twbs/bootstrap/issues/16663

gulp.task('vendorComponents', function() {
  var jsFilter = gulpFilter('**/*.js', {restore: true}),
      cssFilter = gulpFilter('**/*.css', {restore: true});

  return gulp.src(mainBowerFiles())

  // grab vendor js files from mainBowerFiles. I will not be changing these so:
  // minify then push to both srcPath (for working) and distPath (final)
  .pipe(jsFilter)
  .pipe(uglify())
  .pipe(rename({
    suffix: ".min"
  }))
  .pipe(gulp.dest(srcPath + 'components/js/'))
  .pipe(gulp.dest(distPath + 'components/js/'))
  .pipe(jsFilter.restore)

  // grab vendor css files from mainBowerFiles. I will not be changing these so:
  // minify then push to both srcPath (for working) and distPath (final)
  .pipe(cssFilter)
  .pipe(cleanCSS())
  .pipe(rename({
      suffix: ".min"
  }))
  .pipe(gulp.dest(srcPath + 'components/css/'))
  .pipe(gulp.dest(distPath + 'components/css/'))
  .pipe(browserSync.reload({ // Reloading with Browser Sync
      stream: true
  }));
});

//--| END OF vendorComponents |--//

//---------------------------//
//      Scripts Workflow     //
//---------------------------//
// requires:
//   gulp-jshint
//   gulp-sourcemaps
//   gulp-uglify
//   gulp-rename
//   gulp-browser-sync
//---------------------------//

// lint the script files
gulp.task('lint', function() {
   return gulp.src(srcPath +'js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// concat and minify scripts (there's only one js file at the moment)
// http://stackoverflow.com/questions/21699146/gulp-js-task-return-on-src
// https://github.com/gulpjs/gulp/blob/master/docs/API.md#async-task-support
// 'scripts' needs to wait for 'lint' to finish

gulp.task('scripts', ['lint'], function(){
  return gulp.src(srcPath +'js/*.js')
  .pipe(sourcemap.init())
  .pipe(uglify())
  .pipe(rename({ suffix: '.min' }))
  .pipe(sourcemap.write())
  .pipe(gulp.dest(distPath + 'js'))
  .pipe(browserSync.reload({ // Reloading with Browser Sync
      stream: true
  }));
});

//--| END OF Scripts Workflow |--//

//---------------------------//
//      Styles Workflow      //
//---------------------------//
// requires:
//   gulp-clean-css
//   gulp-rename
//   gulp-browser-sync
//---------------------------//

// clean CSS - minify it
gulp.task('styles', function(){
  return gulp.src(srcPath +'css/*.css')
  .pipe(cleanCSS())
  .pipe(rename({ suffix: '.min' }))
  .pipe(gulp.dest(distPath + 'css'))
  .pipe(browserSync.reload({ // Reloading with Browser Sync
      stream: true
  }));
});

//--| END OF Styles Workflow |--//

//---------------------------//
//      HTML Workflow        //
//---------------------------//
// requires:
//   gulp-useref
//   gulp-minify-html
//   gulp-browser-sync
//---------------------------//

// Minify HTML files and output to dist/*.html
gulp.task('content', function() {
  return gulp.src(srcPath + '*.html')
  .pipe(useref())
  // .pipe(minifyhtml({
  //   empty: true,
  //   quotes: true
  // }))
  .pipe(gulp.dest(distPath))
  .pipe(browserSync.reload({ // Reloading with Browser Sync
      stream: true
  }));
});

//--| END OF HTML Workflow |--//

//---------------------------//
//       Helper Tasks        //
//---------------------------//
// requires:
//   gulp-browser-sync
//   gulp-gh-pages
//   del
//   gulp-cache
//   run-sequence
//---------------------------//

// Basic Gulp task syntax
gulp.task('hello', function() {
  console.log('Hello Val!');
});

// Development Tasks
// -----------------

// Start browserSync server to serve from distribution directory
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: distPath
    }
  });
});

// Watchers on source folders
gulp.task('watch', function() {
  gulp.watch( srcPath +'js/*.js', ['lint', 'scripts']);
  gulp.watch( srcPath +'css/*.css', ['styles']);
  gulp.watch( srcPath +'*.html', ['content']);
  gulp.watch( 'bower_components/**', ['vendorComponents']);
});

// Cleaning
gulp.task('clean', function() {
  return del.sync(distPath).then(function(cb) {
    return cache.clearAll(cb);
  });
});

gulp.task('clean:dist', function() {
  return del.sync([ distPath + '**/*']);
});


// Build Sequences
// ---------------

gulp.task('default', function(callback) {
  runSequence(['vendorComponents', 'lint', 'scripts', 'styles', 'content', 'browserSync', 'watch'],
    callback
  );
});

gulp.task('build', function(callback) {
  runSequence(
    'clean:dist',
    ['vendorComponents', 'lint', 'scripts', 'styles', 'content'],
    callback
  );
});

// Publish dist to Github pages
// ----------------------------

gulp.task('deploy', function() {
  return gulp.src( distPath + '**/*')
  .pipe(ghPages());
});


// gulp.task('default', function (){
//   console.log('hello world');
// });

//--| END OF Helper Tasks |--//