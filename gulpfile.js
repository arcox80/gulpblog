(function() {
  var gulp           = require('gulp');
  var del            = require('del');
  var fs             = require('fs');
  var plugins        = require('gulp-load-plugins')();
  var through2       = require('through2');
  var bSync          = require('browser-sync');
  var strftime       = require('strftime');
  var reload         = bSync.reload;

  var site = {
    title:'My Devschool Blog'
  };

  var summary = function(text) {
    var parts = text.split('<!--more-->');
    if (parts.length > 1) {
      return parts[0];
    }
    return '';
  };

  var prettyDate = function(date) {
    var d = (typeof(date) === Date) ? date : Date.parse(date);
    return strftime('%B %d, %Y', new Date(d));
  };

  var collectPosts = function() {
    var posts = [];

    var processPost = function(file, enc, next) {
      var post = file.page;
      post.body = file.contents.toString();
      post.title = file.page.title;
      post.prettyDate = prettyDate(file.page.date);
      post.summary = summary(post.body);
      post.tags = file.page.tags;
      post.permalink = '/blog' + file.path.split("src/posts")[1];

      posts.push(post);
      this.push(file);
      next();
    };

    var finished = function(done) {
      site.posts = posts.sort(function (a, b) {
        return Date.parse(b.date) - Date.parse(a.date);
      });
      fs.writeFileSync('dist/posts.json', JSON.stringify(posts));
      done();
    };

    return through2.obj(processPost, finished);
  };

  gulp.task('clean', function(cb) {
    del('dist').then(function() {
      cb();
    });
  });

  gulp.task('styles', function() {
    return gulp.src('src/styles/**/*')
              .pipe(plugins.sass({outputStyle: 'compact'}).on('error',plugins.sass.logError))
              .pipe(plugins.concat('all.min.css'))
              .pipe(gulp.dest('dist/css'));
  });

  gulp.task('images', function() {
    return gulp.src('src/images/**/*')
              .pipe(gulp.dest('dist/img'));
  });

  gulp.task('static', function() {
    return gulp.src('src/static/**/*')
              .pipe(gulp.dest('dist'));
  });

  gulp.task('posts', function() {
    return gulp.src('src/posts/**/*.md')
              .pipe(plugins.frontMatter({property: 'page', remove: true}))
              .pipe(plugins.markdown())
              .pipe(collectPosts())
              .pipe(plugins.wrap(function(data) {
                return fs.readFileSync('src/templates/post.html').toString();
              }, null, { engine: 'nunjucks' }))
              .pipe(gulp.dest('dist/blog'))
              .pipe(reload({stream: true}));
  });

  gulp.task('pages', function() {
    return gulp.src('src/pages/**/*.html')
              .pipe(plugins.data({site: site}))
              .pipe(plugins.nunjucksRender({
                path: ['src/templates']
              }))
              .pipe(gulp.dest('dist'))
              .pipe(reload({stream: true}));
  });

  gulp.task('serve', function(cb) {
    plugins.sequence('watch', 'sync', cb);
  });

  gulp.task('sync', function() {
    return bSync({server: { baseDir: 'dist' }});
  });


  gulp.task('scripts', function() {
  return gulp.src('src/scripts/**/*.js')
             .pipe(plugins.concat('all.min.js'))
             .pipe(gulp.dest('dist/js'));
  });

  gulp.task('content', function(cb) {
    plugins.sequence('posts', 'pages', cb);
  });

  gulp.task('assets', function(cb) {
    plugins.sequence('static', 'styles', 'scripts', 'images', cb);
  });


// WATCH
  gulp.task('watch', function() {
    gulp.watch('src/scripts/**/*.js', ['scripts']);
    gulp.watch('src/styles/**/*.css', ['styles']);
    gulp.watch(['src/**/*.html'], ['pages']);
    gulp.watch(['src/posts/**/*'], ['posts']);
    gulp.watch('src/images/**/*', ['images']);
  });

  gulp.task('default', plugins.sequence('clean', 'assets', 'content', 'serve'));
}());
