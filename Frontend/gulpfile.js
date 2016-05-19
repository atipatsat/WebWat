var gulp         = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var babel        = require('gulp-babel');
var browserSync  = require('browser-sync');
var concat       = require('gulp-concat');
var eslint       = require('gulp-eslint');
var filter       = require('gulp-filter');
var newer        = require('gulp-newer');
var notify       = require('gulp-notify');
var plumber      = require('gulp-plumber');
var reload       = browserSync.reload;
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');

var onError = function(err) {
  notify.onError({
    title:    "Error",
    message:  "<%= error %>",
  })(err);
  this.emit('end');
};

var plumberOptions = {
  errorHandler: onError,
};

var jsFiles = {
  vendor: [

  ],
  source: [
    'js/main.js',
    'js/components/appControllers.js',
    'js/components/appServices.js',
  ]
};

// Lint JS/JSX files
gulp.task('eslint', function() {
  return gulp.src(jsFiles.source)
    .pipe(eslint({
      baseConfig: {
        "ecmaFeatures": {
           "jsx": true
         }
      }
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

// Copy Bower’s copy of react.js to assets/js/src/vendor
// only if Bower’s copy is "newer"
gulp.task('copy-react', function() {
  return gulp.src('bower_components/react/react.js')
    .pipe(newer('js/vendor/react.js'))
    .pipe(gulp.dest('js/vendor'));
});

//Copy Angular Modules
gulp.task('copy-angular', function() {
  return gulp.src('bower_components/angular/angular.js')
    .pipe(newer('js/vendor/angular.js'))
    .pipe(gulp.dest('js/vendor'));
});
gulp.task('copy-angular-route', function() {
  return gulp.src('bower_components/angular-route/angular-route.js')
    .pipe(newer('js/vendor/angular-route.js'))
    .pipe(gulp.dest('js/vendor'));
});
gulp.task('copy-angular-cookies', function() {
  return gulp.src('bower_components/angular-cookies/angular-cookies.js')
    .pipe(newer('js/vendor/angular-cookies.js'))
    .pipe(gulp.dest('js/vendor'));
});

////Copy Bootstrap CSS
//gulp.task('copy-bootstrap', function() {
//  return gulp.src('bower_components/bootstrap/dist/bootstrap.min.css')
//    .pipe(newer('css/vendor/bootstrap.css'))
//    .pipe(gulp.dest('css/vendor'));
//});

// Copy assets/js/vendor/* to assets/js
gulp.task('copy-js-vendor', function() {
  return gulp
    .src([
//      'js/vendor/react.js'
        'js/vendor/angular.js',
        'js/vendor/angular-route.js',
        'js/vendor/angular-cookies.js'
    ])
    .pipe(gulp.dest('build/js'));
});

gulp.task('copy-css-vendor', function() {
  return gulp
    .src([
        'bower_components/bootstrap/dist/css/bootstrap.min.css'
    ])
    .pipe(gulp.dest('build/css'));
});

// Concatenate jsFiles.vendor and jsFiles.source into one JS file.
// Run copy-react and eslint before concatenating
gulp.task('concat', ['copy-angular', 'copy-angular-route', 'copy-angular-cookies', 'eslint'], function() {
  return gulp.src(jsFiles.vendor.concat(jsFiles.source))
    .pipe(sourcemaps.init())
    .pipe(babel({
      only: [
        'js/components/**/*',
      ],
      compact: false
    }))
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('build/js'));
});

// Compile Sass to CSS
gulp.task('sass', function() {
  var autoprefixerOptions = {
    browsers: ['last 2 versions'],
  };

  var filterOptions = '**/*.css';

  var reloadOptions = {
    stream: true,
  };

  var sassOptions = {
    includePaths: [

    ]
  };

  return gulp.src('css/**/*.scss')
    .pipe(plumber(plumberOptions))
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('build/css'))
    .pipe(filter(filterOptions))
    .pipe(reload(reloadOptions));
});

// Watch JS/JSX and Sass files
gulp.task('watch', function() {
  gulp.watch('js/**/*.{js,jsx}', ['concat']);
  gulp.watch('css/**/*.scss', ['sass']);
});

// BrowserSync
gulp.task('browsersync', function() {
  browserSync({
    server: {
      baseDir: './'
    },
    open: false,
    online: false,
    notify: false,
  });
});

gulp.task('build', ['sass', 'copy-js-vendor', 'copy-css-vendor', 'concat']);
gulp.task('default', ['build', 'browsersync', 'watch']);