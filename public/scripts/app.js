/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

var data = [
    {
      "user": {
        "name": "Newton",
        "avatars": {
          "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
          "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
          "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
        },
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": {
          "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
          "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
          "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
        },
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    },
    {
      "user": {
        "name": "Johann von Goethe",
        "avatars": {
          "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
          "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
          "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
        "handle": "@johann49"
      },
      "content": {
        "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
      },
      "created_at": 1461113796368
    }
  ]
  

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
    renderTweets(data);
    function getTweet() {
      $.ajax({
        method: 'GET',
        url: '/tweets',
        dataType: 'json'
      }).done(function(result){
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
  });
