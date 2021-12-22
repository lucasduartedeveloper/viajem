console.log("script.js");

// Set the date we're counting down to
var countDownDate = new Date("Dec 23, 2021 20:55:00").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the resultghp
  document.getElementById("dias").innerHTML = days + "dias " + hours + "h "
  + minutes + "m " + seconds + "s ";

  document.getElementById("horas").innerHTML = (days * 24) + hours + "h "
  + minutes + "m " + seconds + "s ";

  document.getElementById("minutos").innerHTML = (((days * 24) + hours) * 60)
 + minutes + "m " + seconds + "s ";

  document.getElementById("segundos").innerHTML = (((((days * 24) + hours) * 60) + minutes) * 60) + seconds + "s ";

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("dias").innerHTML = "EXPIRED";
    document.getElementById("horas").innerHTML = "EXPIRED";
    document.getElementById("minutos").innerHTML = "EXPIRED";
    document.getElementById("segundos").innerHTML = "EXPIRED";
  }
}, 1000);

$(document).ready(function() {
  console.log("document.ready");
  $.getJSON( "/ajax/localizacao.php?lat=0&long=0", function(data) {
       map.setView([data.latitude, data.longitude], 18);
       marker.setLatLng(new L.LatLng(data.latitude, data.longitude));
       circle.setLatLng(new L.LatLng(data.latitude, data.longitude));
       rectangle.setBounds(circle.getBounds());
       console.log(JSON.stringify(data));
   });

  $( "#target" ).click(function() {
    $.getJSON( "/ajax/localizacao.php?lat="+geolocation.latitude+"&long="+geolocation.longitude, function(data) {
       map.setView([data.latitude, data.longitude], 18);
       marker.setLatLng(new L.LatLng(data.latitude, data.longitude));
       cicle.setLatLng(new L.LatLng(data.latitude, data.longitude));
       rectangle.setBounds(circle.getBounds());
       console.log(JSON.stringify(data));
    });
  })
});