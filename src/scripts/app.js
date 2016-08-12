var posts;

var renderArticle = function(json) {
  var el = $("#articleExcerptTemplate").clone();
  el.removeAttr('id');
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
    posts = data;
    $(document).trigger('dataLoaded');
  });


  $(document).on('dataLoaded', function(event) {
    posts.slice(1).forEach(function(json) {
      $(".article-container").append(renderArticle(json));
    });
    console.log('Data has loaded');

    // run function that watches the scroll
  });

  function watchScroll() {
  //var win = $(window);

  //win.scroll(function() {
  //  check the scroll to the $(".article-container')
  //  if you hot the bottom, you append another articler
  //  which will extend the bottom downward
  //  and when the bottom is hit again it repeats
  //  oppend
  //
  //  eg. $(".article-container").append(renderArticle(nextJson));
  //});
  };
});
