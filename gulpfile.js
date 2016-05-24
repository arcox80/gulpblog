var gulp           = require('gulp');
var data           = require('gulp-data');
var sequence       = require('gulp-sequence');
var through2       = require('through2');
var markdown       = require('gulp-markdown');
var frontMatter    = require('gulp-front-matter');
var nunjucksRender = require('gulp-nunjucks-render');
var bSync          = require('browser-sync');
var reload         = bSync.reload;

var site = {};

var collectPosts = function() {
  var posts = [];

  var buildPost = function(file, enc, next) {
    var post = file.page;
    post.body = file.contents.toString();
    posts.push(post);
    this.push(file);
    next();
  };

  var addPostsToSite = function(done) {
    site.posts = posts;
    done();
  }

  return through2.obj(buildPost, addPostsToSite);
};

gulp.task('posts', function() {
  return gulp.src('src/posts/**/*.md')
             .pipe(frontMatter({property: 'page', remove: true}))
             .pipe(collectPosts())
             .pipe(markdown())
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

gulp.task('default', sequence('posts', 'pages', 'serve'));
