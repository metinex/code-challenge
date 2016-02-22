var
  gulp = require("gulp"),
  /**
   * @see https://github.com/austinpray/gulp-npm-script-sync
   */
  sync = require('gulp-npm-script-sync'),
  /**
   * @see https://www.browsersync.io/docs/gulp/
   */
  browserSync = require("browser-sync").create(),
  /**
   * Fallback to index.html for applications that are using the HTML 5 history API
   * @see https://github.com/bripkens/connect-history-api-fallback
   */
  connectHistoryApiFallback = require('connect-history-api-fallback');

gulp.task('start', function () {
  browserSync.init({
    server: {
      baseDir: './',
      index: 'index.html',
      middleware: [connectHistoryApiFallback()]
    }
  });

  gulp.watch(['**/*.html', '**/*.js', '**/*.css'])
    .on('change', browserSync.reload);
});

gulp.task('default', ['start']);

sync(gulp);
