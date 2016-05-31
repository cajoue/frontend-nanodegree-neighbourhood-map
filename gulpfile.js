//---------------------------//
//       Configuration       //
//---------------------------//
var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
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
    useref = require('gulp-useref');

var srcPath = 'src/'; // Path to source files
var distPath = 'dist/'; // Path to distribution files

// Paths that gulp should watch
var watchPaths = {
  scripts: [
    srcPath +'js/*.js'
  ],
  styles: [
    srcPath +'css/*.css'
  ],
  content: [
    srcPath +'*.html'
  ],
  bower: [
    'bower_components/**'
  ]
};

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
//---------------------------//
// Run when add any new bower packages installed (hopefully automated now that in 'serve')
// grab main files from mainBowerFiles, push to srcPath for working directory
// and also minify and push in distPath
// http://stackoverflow.com/questions/22901726/how-can-i-integrate-bower-with-gulp-js

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
  .pipe(gulp.dest(distPath + 'components/css/'));
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
//---------------------------//

// lint the script files
gulp.task('lint', function() {
    gulp.src(watchPaths.scripts)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// concat and minify scripts (there's only one js file at the moment)
gulp.task('scripts', function(){
  gulp.run('lint');

  gulp.src(watchPaths.scripts)
  .pipe(sourcemap.init())
  .pipe(concat('app.js'))
  .pipe(uglify())
  .pipe(rename({ suffix: '.min' }))
  .pipe(sourcemap.write())
  .pipe(gulp.dest(distPath + 'js'))
  .pipe(reload({stream: true}))
});

//--| END OF Scripts Workflow |--//

//---------------------------//
//      Styles Workflow      //
//---------------------------//
// requires:
//   gulp-clean-css
//   gulp-rename
//---------------------------//

// clean CSS - minify it
gulp.task('styles', function(){
  gulp.src(watchPaths.styles)
  .pipe(cleanCSS())
  .pipe(rename({ suffix: '.min' }))
  .pipe(gulp.dest(distPath + 'css'))
  .pipe(reload({stream: true}))
});

//--| END OF Styles Workflow |--//

//---------------------------//
//      HTML Workflow        //
//---------------------------//
// requires:
//   gulp-useref
//   gulp-minify-html
//---------------------------//

// Minify HTML files and output to dist/*.html
gulp.task('content', function() {
  return gulp.src([srcPath + '*.html'])
  .pipe(useref())
  .pipe(minifyhtml({
    empty: true,
    quotes: true
  }))
  .pipe(gulp.dest(distPath))
});

//--| END OF HTML Workflow |--//

//---------------------------//
//       Helper Tasks        //
//---------------------------//
// requires:
//   gulp-browser-sync
//   gulp-gh-pages
//---------------------------//

// automatically sync browser when make changes to 'watched' files
gulp.task('serve', function(){
  browserSync.init({
    server: {
      baseDir: distPath
    }
  });

  gulp.watch( watchPaths.content, ['content']);
  gulp.watch( watchPaths.scripts, ['scripts']);
  gulp.watch( watchPaths.styles, ['styles']);
  gulp.watch( watchPaths.bower, ['vendorComponents']);
});

// publish contents to Github pages
gulp.task('deploy', function() {
  return gulp.src( distPath + '**/*')
  .pipe(ghPages());
});

// gulp default watches main files and serves them to browserSync
gulp.task('default', ['content', 'scripts', 'styles', 'serve']);


// gulp.task('default', function (){
//   console.log('hello world');
// });

//--| END OF Helper Tasks |--//