// jQuery to uncheck menu checkbox, acting as menu button for mobile devices, in order to hide collapsed content
$(function () {
    "use strict";
    
    function uncheckBox() {
      var isChecked = $("#menu-btn").prop("checked");
      if (isChecked) {
        $("#menu-btn").prop("checked", false);
      }
    }
    
    $("body").on("click", function () {
      uncheckBox();
    });
    
    $("#menu-btn,label").on("click", function (e) {
      e.stopPropagation();
    });
  });