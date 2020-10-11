$(document).ready(function() {
    function setHeight() {
      windowHeight = $(window).innerHeight();
      $('.main-banner iframe').css('min-height', windowHeight -140);
    };
    setHeight();
    
    $(window).resize(function() {
      setHeight();
    });

});

function openNav() {
    document.getElementById("mySidenav").style.width = "220px";
}
  
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}