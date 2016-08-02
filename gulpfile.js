//require gulp
var gulp = require('gulp');

//require plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var nodemon = require('gulp-nodemon');

//Set up .scss compilation to css (Sass)
gulp.task('sass', function(){
  return gulp.src('client/content/styles/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist/css'));
});

//Set up linting for all files
gulp.task('lint', function(){
  return gulp.src('client/app/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

//Set up uglification and concat
gulp.task('scripts', function(){
  return gulp.src('client/app/**/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('public'))
    .pipe(rename('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

//Set up task to watch for any changes
gulp.task('watch', function(){
  gulp.watch('client/app/**/*.js', ['lint', 'scripts']);
  gulp.watch('client/content/styles/*.scss');
});

//Set up nodemon
gulp.task('start', function(){
  nodemon({
    script: __dirname + '/server/server.js',
    ext: 'js html',
  })
  .on('restart', function(){
    console.log('restarted');
  })
});

gulp.task('default', ['sass', 'lint', 'scripts', 'start', 'watch']);

