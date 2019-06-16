$(document).ready(function() {
  $("#doodle-canvas").hide();
   
  $("#doodle-button").on("click", () => {
    $("#doodle-button").prop('disabled', true);
    $("#tweet-button").prop('disabled', false);
    $("#doodle-canvas").toggle(400);
    $("#new-tweet-input").hide(400);

  });

  $("#tweet-button").on("click", () => {
    $("#tweet-button").prop('disabled', true);
    $("#doodle-button").prop('disabled', false);
    $("#new-tweet-input").toggle(400);
    $("#new-tweet-input").focus();
    $("#doodle-canvas").hide(400);
  })



});