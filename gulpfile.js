var gulp = require('gulp');
var data = require('gulp-data');
var sequence = require('gulp-sequence');
var through2 = require('through2');
var markdown = require('gulp-markdown');
var frontMatter = require('gulp-front-matter');
var nunjucksRender = require('gulp-nunjucks-render');

var site = {};

var collectPosts = function() {
  var posts = [];

  return through2.obj(function(file, enc, cb) {
    var post = file.page;
    posts.push(post);
    this.push(file);
    cb();
  },
  function(cb) {
    site.posts = posts;
    cb();
  });
};

gulp.task('posts', function() {
  return gulp.src('src/posts/**/*.md')
             .pipe(frontMatter({property: 'page', remove: true}))
             .pipe(collectPosts())
             .pipe(markdown())
             .pipe(gulp.dest('dist/blog'));
});

gulp.task('pages', function() {
  return gulp.src('src/pages/**/*.html')
             .pipe(data({site: site}))
             .pipe(nunjucksRender({
               path: ['src/templates']
             }))
             .pipe(gulp.dest('dist'));
});

gulp.task('default', sequence('posts', 'pages'));
