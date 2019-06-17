$(document).ready(function() {
  $("form").submit(function(event) {
    event.preventDefault();
    
    let $tweetValue = $('#new-tweet-input').val();
    let doodleDataPackage;

    // Convert image to base64
    const canvas = document.getElementById('defaultCanvas0');
    doodleDataPackage = canvas.toDataURL('image/jpeg', 1.0);
    
    switch (true) {
      case $("#doodle-button").is(':disabled'):
        $tweetValue = null;
        console.log("tweet value null?");
        submitTweet();
        break;
      case $tweetValue.length === 0:
        $("#new-tweet-error").html( "<h4>Give me something to tweet!</h4>" ).addClass("red");
        break;
      case $tweetValue.length > 140:
          $("#new-tweet-error").html( "<h4>I can't ingest more than 140 characters!</h4>" ).removeClass("red");
        break;
      case $tweetValue.length <= 140:
        doodleDataPackage = null;
        submitTweet();
        break;
    }


   

    function submitTweet() {
      const $tweetMessage = $('#new-tweet-input').serialize(); 
      console.log($tweetMessage);
    
      $.ajax({
        type: 'POST',
        url: `/tweets`,
        data: {
          text: $tweetValue,
          imgData: doodleDataPackage
        },
        success: function() {
          $( "#new-tweet-input").val('');
          $( "#tweets-container" ).empty();
          $("#new-tweet-error").empty().removeClass("red");
          $(".counter").text('140');
          background(255);
          if ($("#doodle-button").is(':disabled')) {
            $("#tweet-button").prop('disabled', true);
            $("#doodle-button").prop('disabled', false);
            $("#new-tweet-input").toggle(400);
            $("#new-tweet-input").focus();
            $("#doodle-canvas").hide(400);
          }

          loadTweets();
        },
        error: function (err) {
          console.log("ERROR: ", err);
          $("#new-tweet-error").html( "<h4>You can't send a blank doodle!</h4>" ).removeClass("red");

        }
      })
      
    }
  });


});