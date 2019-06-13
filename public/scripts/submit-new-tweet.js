$(document).ready(function() {
  $("form").submit(function(event) {
    event.preventDefault();
    
    const $tweetValue = $('#new-tweet-input').val();

    switch (true) {
      case $tweetValue.length === 0:
        $("#new-tweet-error").html( "<h4>Give me something to tweet!</h4>" ).addClass("red");
        break;
      case $tweetValue.length > 140:
          $("#new-tweet-error").html( "<h4>I can't ingest more than 140 characters!</h4>" ).removeClass("red");
        break;
      case $tweetValue.length <= 140:
        submitTweet();
        break;
    }

    function submitTweet() {
      const $tweetMessage = $('#new-tweet-input').serialize(); 
      console.log($tweetMessage);
    
      $.ajax({
        type: 'POST',
        url: `/tweets`,
        data: $tweetMessage,
        success: function() {
          $( "#new-tweet-input").val('');
          $( "#tweets-container" ).empty();
          $("#new-tweet-error").empty().removeClass("red");
          loadTweets();
        }
      })
      
    }
  });


});