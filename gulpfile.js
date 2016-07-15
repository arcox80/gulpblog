(function() {
  var gulp           = require('gulp');
  var del            = require('del');
  var fs             = require('fs');
  var wrap           = require('gulp-wrap');
  var plugins        = require('gulp-load-plugins')();
  var data           = require('gulp-data');
  var sequence       = require('gulp-sequence');
  var through2       = require('through2');
  var markdown       = require('gulp-markdown');
  var frontMatter    = require('gulp-front-matter');
  var nunjucksRender = require('gulp-nunjucks-render');
  var nunjucks       = require('gulp-nunjucks');
  var bSync          = require('browser-sync');
  var sass           = require('gulp-sass');
  var reload         = bSync.reload;

  var site = {
    title:'A Blog Site'
  };


  var collectPosts = function() {
    var posts = [];

    var buildPost = function(file, enc, next) {
      var post = file.page;
      post.body = file.contents.toString();
      post.title = file.page.title;
      post.tags = file.page.tags;
      post.permalink = '/blog' + file.path.split("src/posts")[1];

      posts.push(post);
      this.push(file);
      next();
    };

    var addPostsToSite = function(done) {
      site.posts = posts;
      done();
    };

    return through2.obj(buildPost, addPostsToSite);
  };

  gulp.task('clean', function(cb) {
    del('dist').then(function() {
      cb();
    });
  });

  gulp.task('styles', function() {
    return gulp.src('src/styles/**/*')
              .pipe(sass({outputStyle: 'compact'}).on('error',sass.logError))
              .pipe(plugins.concat('all.css'))
              .pipe(gulp.dest('dist/css'));
  });

  gulp.task('images', function() {
    return gulp.src('src/images/**/*')
              .pipe(gulp.dest('dist/img'));
  });

  gulp.task('posts', function() {
    return gulp.src('src/posts/**/*.md')
              .pipe(frontMatter({property: 'page', remove: true}))
              .pipe(markdown())
              .pipe(collectPosts())
              .pipe(wrap(function(data) {
                return fs.readFileSync('src/templates/blog.html').toString();
              }, null, { engine: 'nunjucks' }))
              .pipe(gulp.dest('dist/blog'))
              .pipe(reload({stream: true}));
  });

  gulp.task('pages', function() {
    return gulp.src('src/pages/**/*.html')
              .pipe(data({site: site}))
              .pipe(nunjucksRender({
                path: ['src/templates']
              }))
              .pipe(gulp.dest('dist'))
              .pipe(reload({stream: true}));
  });

  gulp.task('serve', function(cb) {
    sequence('sync', cb);
  });

  gulp.task('sync', function() {
    return bSync({server: { baseDir: 'dist' }});
  });


  gulp.task('scripts', function() {
  return gulp.src('src/scripts/**/*.js')
              .pipe(gulp.dest('dist/js'));
  });

  gulp.task('content', function(cb) {
    sequence('posts', 'pages', cb);
  });

  gulp.task('assets', function(cb) {
    sequence('styles', 'scripts', 'images', cb);
  });

  gulp.task('default', sequence('clean', 'assets', 'content', 'serve'));
}());
