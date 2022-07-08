document.addEventListener('contextmenu',
                        event => event.preventDefault());

var coin = new Audio("audio/coin.wav");
var notification = new Audio("audio/game-notification.wav");
var gameOver = new Audio("audio/game-over.wav");

// Saldo
var playerId = new Date().getTime();
var partNo = 0;

var rotateX = 0;
var rotateY = 0;
var rotateZ = 0;

$(document).ready(function() {
     getXYZ();
     getCube();

     var video = document.getElementById("video");
     if (navigator.mediaDevices) {
          navigator.mediaDevices
          .getUserMedia({ video: { facingMode: { exact: "environment" } }, audio: false })
          .then((stream) => {
               video.srcObject = stream;
          });
     }

     var x = 0;
     var y = 0;
     var sh = window.innerHeight;
     var sw = window.innerWidth;
  
     $("#rotateX, #rotateY, #rotateZ")
     .on("change", function() {
         $("#rotation-label").text(
              "Rotation X: " + rotateX + ", " +
              "Y: " + rotateY + ", " +
              "Z: " + rotateZ
         );

         ws.send("CUBE-DEFENDER|" +
                  playerId + "|" + 
                  rotateX.toString() + "|" + 
                  rotateY.toString() + "|" + 
                  rotateZ.toString());

         if (gotXYZ) updateXYZ();
     });

     var touchStart = 0;
     $("#cube-container").on("touchstart", function(e) {
         //alert("TODO: Incluir uma animação.")
         touchStart = new Date().getTime();
         resetCube();
     });

    $("#cube-container").on("touchend", function(e) {
         //alert("TODO: Incluir uma animação.")
         if (new Date().getTime() - touchStart == 5000) {
              resetCube();
         }
    });

     setInterval(function() {
         var canvas = 
         document.getElementById("camera-canvas");
         var context = canvas.getContext("2d");

         context.drawImage(video, 0, 0, 128, 128);

         rotateX = parseInt($("#rotateX").val());
         rotateY = parseInt($("#rotateY").val());
         rotateZ = parseInt($("#rotateZ").val());

         $("#cube-container")
         .css("transform", 
         "rotateX("+ (rotateX) + "deg) "+
         "rotateY("+ (rotateY) + "deg) "+
         "rotateZ("+ (rotateZ) + "deg)");

         if (rotateX != parseInt($("#rotateX").val()) &&
              rotateY != parseInt($("#rotateY").val()) &&
              rotateZ != parseInt($("#rotateZ").val())) {
                  
         }
     }, 100);

     var side = 0;
     $("#camera-canvas").click(function(e) {
         notification.play();
 
         var base64 = 
         document.getElementById("camera-canvas").
         toDataURL();

         $("#cube-container").children()[side].src =
         base64;
         saveSide(side, base64);

         side += 1;
         side = side > 5 ? 0 : side;
     });

     ws.onmessage = function(e) {
        var msg = e.data.split("|");
        if (msg[0] == "CUBE-DEFENDER" &&
            playerId != msg[1]) {

            rotateX = parseInt(msg[2]);
            rotateY = parseInt(msg[3]);
            rotateZ = parseInt(msg[4]);
            
            $("#rotateX, #rotateY, #rotateZ")
           .trigger("change");
        }
    };
});

var gotXYZ = false;
function getXYZ() {
     $.getJSON("ajax/cube-defender.php", function(data) {
          var xyz = data[0].valor.split("|");
          rotateX = parseInt(xyz[0]);
          rotateY = parseInt(xyz[1]);
          rotateZ = parseInt(xyz[2]);
          //console.log(data);
         
         $("#rotateX, #rotateY, #rotateZ")
         .trigger("change");

         gotXYZ = true;
     });
}

function updateXYZ() {
     $.post("ajax/cube-defender.php", {
          xyz: rotateX + "|" +  rotateY + "|" + rotateZ,
          }).done(function(data) {
              //console.log(data);
     });
}

function getCube() {
     $.getJSON("/camera/ajax/camera.php", 
     function(data) {
          for (var k = 0; k < data.length; k++) {
               $("#cube-container").children()[k].src =
               data[k].base64;
	        //console.log(data);
          }
     });
}

function saveSide(side, base64) {
      $.post("/camera/ajax/camera.php", {
             cameraId: side,
             base64: base64,
             }).done(function(data) { 
                   $("#cube-container").children()[side].src =
                   base64;
                   //console.log(data);
      });
}

var baseImages = [
      "img/front.png",
      "img/back.png",
      "img/left.png",
      "img/top.png",
      "img/right.png",
      "img/bottom.png",
];

function resetCube() {
      for (var k = 0; k < 6; k++) {
	      //console.log(data);
             saveSide(k, baseImages[k]);
      }
      //say("q was deleted, you failed.");
}

var sh = window.innerHeight;
var sw = window.innerWidth;
canvas.width = sw;
p.he,eight = sh/3;

// Texto para audio
var speaking = false;
function say(text) {
    if (!speaking) {
         speaking = true;
         var msg = new SpeechSynthesisUtterance();
         msg.lang = "pt-BR";
         //msg.lang = "en-US";
         //msg.lang = "ja-JP";
         msg.text = text;
         msg.onend = function(event) {
              speaking = false;
         };
         window.speechSynthesis.speak(msg);
    }
}