$(document).ready(function () {
  
  $("#compose-new-tweet").addClass("display-none");


  $(".compose-button").hover( () => {
    $(".compose-button").addClass("orange");
  }, () => {
    $(".compose-button").removeClass("orange");
  });

  $(".compose-button").on( "click", () => {
    console.log("Compose button was clicked");
    // $(".new-tweet").slideToggle( 300, function() {
    //   console.log("Animation complete");
    //   $("#new-tweet-input").focus();
    // });

    $(".new-tweet").slideToggle({
      duration: 300,
      complete: function() {
        console.log("Animation complete");
        $("#new-tweet-input").focus();
      }
    });
  });
 
});