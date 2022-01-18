console.log("script.js");

// Set the date we're counting down to
var countDownDate = new Date("Jan 18, 2022 14:00:00").getTime();

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
  document.getElementById("horas").innerHTML = (days * 24) + hours + "h "
  + minutes + "m " + seconds + "s ";

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("horas").innerHTML = "EXPIRED";
  }
}, 1000);

$(document).ready(function() {
    //setInterval(reload, 15000);

   console.log("document.ready");
   reload();

  $.getJSON( "/ajax/localizacao.php?lat=0&long=0", function(data) {
       map.setView([data.latitude, data.longitude], 17);
       marker.setLatLng(new L.LatLng(data.latitude, data.longitude));
       circle.setLatLng(new L.LatLng(data.latitude, data.longitude));
       rectangle.setBounds(circle.getBounds());
       console.log(JSON.stringify(data));
   });

$( "#target" ).click(function() {
    $.getJSON( "/ajax/localizacao.php?lat="+geolocation.latitude+"&long="+geolocation.longitude, function(data) {
       map.setView([data.latitude, data.longitude], 17);
       marker.setLatLng(new L.LatLng(data.latitude, data.longitude));
       circle.setLatLng(new L.LatLng(data.latitude, data.longitude));
       rectangle.setBounds(circle.getBounds());
       rectangle.redraw();
       console.log(JSON.stringify(data));
    });
  });
});

$( "#menu" ).click(function() {
    $(".box2").toggle();
    console.log("toggle");
    reload();
});

$(document).on('change', ':radio[name="monster"]', function() {
    $('label').removeClass('active');
    $(this).filter(':checked').parent().addClass('active');
    var expr = $(this).filter(':checked').attr('id');
    var k = parseInt(expr.replace('monster', ''));
    monster = monsters[k];
    $('#nome').text(monster.nome);
    document.getElementById('output').src = monster.base64;
});

function reload() {
      $.getJSON( "/ajax/localizacao_teste.php", function(data) {
      console.log(data);
      console.log("reload");
      var label1 = "";
      var label2 = "";
      var label3 = "";
      var label4 = "";
      var label5 = "";
      for(var k in data) {
           var icon = L.icon({
               iconUrl: data[k].base64,
               shadowUrl: '/img/monster-shadow.png',
               iconSize:     [35, 40], // size of the icon
               shadowSize:   [50, 25], // size of the shadow
               iconAnchor:   [17.5, 40], // point of the icon which will correspond to marker's location
               shadowAnchor: [25, 10],  // the same for the shadow
               popupAnchor:  [0, -40] // point from which the popup should open relative to the iconAnchor
          });
          data[k].marker = L.marker([data[k].latitude, data[k].longitude], {icon: icon}).addTo(map).bindPopup(data[k].nome);

          data[k].marker.getPopup().on('remove', 
          function() {
                $.get("/ajax/localizacao_teste.php?deleteId="+data[k].id)
                .done(function() { 
                   console.log("deleteId = "+data[k].id);
                   reload();
                });
          });

          var html = "<label class=\"btn btn-outline-dark btn-sm\"><input type=\"radio\" display=\"none\" name=\"monster\" id=\"monster"+k+"\" autocomplete=\"off\" data-toggle=\"modal\" data-target=\"#exampleModal\"><img class=\"icone\" src=\""+data[k].base64+"\"/></label>";

           if (k <= 3) {
               label1 += html;
           }
           else if (k <= 7) {
               label2 += html;
           }
           else if (k <= 11) {
               label3 += html;
           }
           else if(k <= 15) {
               label4 += html;
           }
          else {
               label5 += html;
           }
       }

       for(var k in monsters) {
           map.removeControl(monsters[k].marker);
       }

       monsters = data;
       $('#teste1').html(label1);
       $('#teste2').html(label2);
       $('#teste3').html(label3);
       $('#teste4').html(label4);
    });
}

$('#add').click(function() {
   $('#camera').click();
});

function saveImage() {
    if (window.File && window.FileReader && window.FileList && window.Blob) {

        var filesToUpload = document.getElementById('camera').files;
        var file = filesToUpload[0];
        if (file) {

            var reader = new FileReader();
            // Set the image once loaded into file reader
            reader.onload = function(e) {
                var img = document.createElement("img");
                img.onload = function () {
                    var canvas = document.createElement("canvas");
                    var ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0);

                    var MAX_WIDTH = 200;
                    var MAX_HEIGHT = 200;
                    var width = img.width;
                    var height = img.height;

                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width;
                            width = MAX_WIDTH;
                        }
                    } else {
                    if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height;
                            height = MAX_HEIGHT;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    var ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0, width, height);

                    var nome = prompt("NOME DA FOTO", "TESTE");
                    var dataurl = canvas.toDataURL(file.type);
                    //console.log(dataurl);
                    document.getElementById('output').src = dataurl;

                    $.post("/ajax/localizacao_teste_photo.php",
                    { nome: nome, png: dataurl })
                    .done(function(data) {
                       console.log(data);
                       reload();
                    });
                }
                img.src = e.target.result;
            }
            reader.readAsDataURL(file);
        }
    } else {
        alert('The File APIs are not fully supported in this browser.');
    }
}