$(document).ready(function() {
  $("#pop-hover").click(function() {
    $(this).fadeOut();
    $("#pop-img").fadeOut();
  });

  $("#pop-close").click(function() {
    $("#pop-hover").fadeOut();
    $("#pop-img").fadeOut();
  });
});
