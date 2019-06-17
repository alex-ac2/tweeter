$(document).ready(function() {
  $("form").submit(function(event) {
    event.preventDefault();
    
    let $tweetValue = $('#new-tweet-input').val();
    
    // Convert image to base64
    const canvas = document.getElementById('defaultCanvas0');
    const doodleDataPackage = canvas.toDataURL('image/jpeg', 1.0);
    console.log(doodleDataPackage);
    // const doodleDataBlob = canvas.toBlob( (blob) => {
    //   console.log('innner: ', blob);
    // }, 'image/jpeg', 1.0);
    // console.log('outer blob: ', doodleDataBlob);

    switch (true) {
      case $("#doodle-button").is(':disabled'):
        $tweetValue = null;
        submitTweet();
        break;
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