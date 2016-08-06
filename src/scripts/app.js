var posts;

$(document).ready(function() {
  console.log('jquery loaded');
  $.getJSON('/posts.json').done(function(data) {
    posts = data;
  });
console.log(posts);
  
});
