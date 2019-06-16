$(document).ready(function () {
  
  $("#compose-new-tweet").addClass("display-none");
  $("#tweet-button").prop('disabled', true);


  $(".compose-button").hover( () => {
    $(".compose-button").addClass("orange");
  }, () => {
    $(".compose-button").removeClass("orange");
  });

  // Waits for click to execute slideToggle
  $(".compose-button").on( "click", () => {
    console.log("Compose button was clicked");
    
    $(".new-tweet").slideToggle({
      duration: 300,
      complete: () => {
        console.log("Animation complete");
        $("#new-tweet-input").focus();
      }
    });
  });
 
});