var gulp = require('gulp');

var vendor_paths = [ 'src/components/jquery/dist/jquery.min.js',
                'src/components/knockout/dist/knockout.js',
                'src/components/normalize-css/normalize.css' ];

gulp.task('default', function (){
  console.log('hello world');
});



gulp.task('vendor-scripts', function() {
   gulp.src(vendor_paths, {base: 'src/components/'})
         .pipe(uglify()) //This is the js minification step if you need it.
         .pipe(gulp.dest('/dist');
});