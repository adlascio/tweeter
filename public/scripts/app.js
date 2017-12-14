
function createTweetElement(tweet){
    var $img = $("<img>").addClass("avatar");
    $img.attr('src', tweet.user.avatars.small);
    var $spanImg = $("<span>");
    $spanImg.append($img);
    //---------------------------------------------
    var $spanName = $("<span>").addClass("name");
    $spanName.text(tweet.user.name);
    //---------------------------------------------
    var $spanUsername = $("<span>").addClass("username");
    $spanUsername.text(tweet.user.handle);
    //---------------------------------------------------
    var $header = $("<header>");
    $header.append($spanImg);
    $header.append($spanName);
    $header.append($spanUsername);
    //----------------------------------------------------
    var $div = $("<div>").addClass("tweet");
    var $p = $("<p>").text(tweet.content.text);
    $div.append($p);
    //--------------------------------------------------------
    var $footer = $("<footer>");
    var dateFromNow = moment(tweet.created_at).fromNow();
    var $footerText = $("<div>").text(dateFromNow);
    var $footerImages = $("<div>");
    $footerImages.append($("<i>").addClass('fa fa-flag'));
    $footerImages.append($("<i>").addClass('fa fa-retweet'));
    $footerImages.append($("<i>").addClass('fa fa-heart'));
    $footer.append($footerText).append($footerImages);
    //--------------------------------------------------------
    var $article = $("<article>");
    $article.append($header);
    $article.append($div);
    $article.append($footer);
    //---------------------------------------------------------
    return $article;
}

function renderTweets(tweets) {
  $('.tweets')
  .empty()
  .html(tweets.map(createTweetElement).reverse());  
}

  $( document ).ready(function() {
    getTweet();
    function getTweet() {
      $.ajax({
        method: 'GET',
        url: '/tweets/',
        dataType: 'json'
      }).done(function(result){
        $('textarea').val("");
        $('#new-tweet').find('#counter').text(140);
        renderTweets(result);
      })
    }
    
    function submitNewTweet() {
      var $submit = $('#new-tweet');
      $submit.on('submit', function(clickEvent) {
        var textArea = $('textarea').val().length;
        clickEvent.preventDefault();
        if (textArea > 140) {
          alert("Tweet over 140 characters. Sorry, can't post it.");
        } else if(textArea === 0) {
          alert('Please enter a tweet.');
        } else {
          $.ajax({
            method: 'POST',
            url: this.action,
            data: $(this).serialize()
          }).done(function() {
            getTweet();
          });
        }
      })  
    }
    submitNewTweet();
    
    var $compose = $('#compose');
    $compose.on('click', function(clickEvent){
      $('.new-tweet').slideToggle();
      $('#new-tweet').find('textarea').focus();
    }); 
  });


