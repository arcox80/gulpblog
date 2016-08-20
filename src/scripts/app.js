var posts = [];

var renderArticle = function(json) {
  var el = $("#articleExcerptTemplate").clone();
  el.removeAttr('id');
  el.removeClass('hidden');
  el.find('.image').attr('src', ['/img', json.image].join("/"));
  el.find('.author').append(json.author);
  el.find('.prettyDate').append(json.prettyDate);
  el.find('.title').append('<a />')
    .attr('href', json.permalink)
    .text(json.title);
  el.find('.subtitle').append(json.subtitle);
  el.find('.summary').append(json.summary);
  el.find('.continue').attr('href', json.permalink);

  return el;
};

$(document).ready(function() {
  console.log('jquery loaded');

  $.getJSON('/posts.json').done(function(data) {
    posts = data.slice(1, data.length);
    $(document).trigger('dataLoaded');
  });


  $(document).on('dataLoaded', function(event) {
    console.log('Data has loaded');
    var renderCount = 0;

    $(window).on('scroll', function() {
      if ($(window).scrollTop() - $('.article-container').innerHeight() - 100 > 0) {
        var newPost = renderArticle(posts[renderCount]);
        $('.article-container').append(newPost);
        renderCount++;
      }
    });
  });

});
