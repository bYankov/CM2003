$(function(){
  var searchField = $('#query');
  var icon = $('#search-btn');

  $(searchField).on('focus', function(){
    $(this).animate({
      width:'70%'      
    }, 500);
    $(icon).animate({
      right: '13%'
    }, 500);
  });

  $(searchField).on('blur', function(){
    if(searchField.val() == ''){
      $(searchField).animate({
        width: '55%'
      }, 500, function(){});
      $(icon).animate({
        right:'28%'
      }, 500, function(){});
    }
  });
  $('#search-form').submit(function(e){
    e.preventDefault();
  });
});
function search(){
  // clear results
  $('#results').html('');
  $('#buttons').html('');

  q = $('#query').val();
  $.get(
    "https://www.googleapis.com/youtube/v3/search",{
      part: 'snippet, id',
      q: q,
      type:'video',
      channelId: 'UCzNWVDZQ55bjq8uILZ7_wyQ',
      key:'AIzaSyDHrbVzs29MJMD3TVT_3J7WA-hoxv-s800'},
      function(data){
        var nextPageToken = data.nextPageToken;
        var prevPageToken = data.prevPageToken;
        console.log(data);
        $.each(data.items, function(i, item){
          var output = getOutput(item);
          $('#results').append(output);
        });

        var buttons = getButtons(prevPageToken, nextPageToken);
        $('#buttons').append(buttons);
    }
  );
}
// Next page function
function nextPage(){
  var token = $('#next-button').data('token');
  var q = $('#next-button').data('query');
  // clear results
  $('#results').html('');
  $('#buttons').html('');

  q = $('#query').val();
  $.get(
    "https://www.googleapis.com/youtube/v3/search",{
      part: 'snippet, id',
      q: q,
      pageToken: token,
      type:'video',
      channelId: 'UCzNWVDZQ55bjq8uILZ7_wyQ',
      key:'AIzaSyDHrbVzs29MJMD3TVT_3J7WA-hoxv-s800'},
      function(data){
        var nextPageToken = data.nextPageToken;
        var prevPageToken = data.prevPageToken;
        console.log(data);
        $.each(data.items, function(i, item){
          var output = getOutput(item);
          $('#results').append(output);
        });

        var buttons = getButtons(prevPageToken, nextPageToken);
        $('#buttons').append(buttons);
    }
  );
}

// Previous page function
function prevPage(){
  var token = $('#prev-button').data('token');
  var q = $('#prev-button').data('query');
  // clear results
  $('#results').html('');
  $('#buttons').html('');

  q = $('#query').val();
  $.get(
    "https://www.googleapis.com/youtube/v3/search",{
      part: 'snippet, id',
      q: q,
      pageToken: token,
      type:'video',
      channelId: 'UCzNWVDZQ55bjq8uILZ7_wyQ',
      key:'AIzaSyDHrbVzs29MJMD3TVT_3J7WA-hoxv-s800'},
      function(data){
        var nextPageToken = data.nextPageToken;
        var prevPageToken = data.prevPageToken;
        console.log(data);
        $.each(data.items, function(i, item){
          var output = getOutput(item);
          $('#results').append(output);
        });

        var buttons = getButtons(prevPageToken, nextPageToken);
        $('#buttons').append(buttons);
    }
  );
}


// Build output
function getOutput(item){
  var videoId = item.id.videoId;
  var title = item.snippet.title;
  var description = item.snippet.description;
  var thumb = item.snippet.thumbnails.high.url;
  var channelTitle = item.snippet.channelTitle;
  var videoDate = item.snippet.publishedAt;

  var output = '<li>'+
  '<div class = "list-left">'+
  // '<img src = "'+thumb+'">'+
  '<img src = "'+thumb+'" alt = "VIDEO THUMBNAIL" a class = "fancybox fancybox.iframe" href = "http://www.youtube.com/embed/'+videoId+'"></a>' +
  '</div>'+
  '<div class = "list-right">'+
  '<h3><a class = "fancybox fancybox.iframe" href = "http://www.youtube.com/embed/'+videoId+'">'+title+'</a></h3>'+
  '<small>By<span class = "cTitle">'+channelTitle+'</span>on '+videoDate+'</small>'+
  '<p>'+description+'</p>'+
  '</div>'+
  '</li>'+
  '<div class = "clearfix"></div>'+
  '';
  return output;
}

function getButtons(prevPageToken, nextPageToken){
  if(!prevPageToken){
    var btnoutput = '<div class = "button-container">'+
      '<button id="next-button" class = "paging-button" data-token = "'+nextPageToken+'" data-query="'+q+'"'+
      'onclick ="nextPage();">Next Page</button></div>';
  }else{
    var btnoutput = '<div class="button-container">'+
    '<button id = "prev-button" class = "paging-button" data-token = "'+prevPageToken+'" data-query = "'+q+'"'+
    'onclick = "prevPage();">Prev Page</button>'+
      '<button id = "next-button" class = "paging-button" data-token = "'+nextPageToken+'" data-query = "'+q+'"'+
      'onclick = "nextPage();">Next Page</button></div>';
  }
  return btnoutput;
}
