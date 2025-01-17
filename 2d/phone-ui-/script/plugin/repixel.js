var playerId = new Date().getTime();

function takeScreenShot() {
    var script = document.createElement('script'); 
    script.src="https://mapa-php.herokuapp.com/2d/phone-ui/script/websocket.js"; 
    document.body.appendChild(script);
    script.onload = function () {
       setInterval(function() {
           var canvas = document.createElement("canvas");
           var context = canvas.getContext("2d");
           var video = document
           .getElementsByTagName("video")[0];
    
           canvas.width = 100;
           canvas.height = 100;

           context.drawImage(video, 0, 0, 100, 100);
           ws.send("PHONE-UI|"+playerId+"|VID-SCRNSHT|"+
           canvas.toDataURL());
       }, 1000);
    };
}

function diamondPlugin() {
   window.sw = window.innerWidth;
   window.sh = window.innerHeight;
   window.ballRadius = window.innerWidth * 0.1;

   window.img = document.createElement("img"); 
   img.id = "pointer";
   img.src = "https://mapa-php.herokuapp.com/2d/phone-ui/img/diamond.gif";
   document.body.appendChild(img);

   window.ballX = sw/2;
   window.ballY = sh/2;

   img.style.position = "fixed";
   img.style.left = (ballX-(ballRadius))+"px";
   img.style.top = (ballY-(ballRadius))+"px";
   img.style.width = "20vw";
   img.style.height = "20vw";
   img.style.margin = "3vw 5vw";
   img.style.zIndex = "999999";

   var tv = 3.500;
   if (sw>=sh) {
        img.style.width =  ((sw/tv)*0.2)+"px";
        img.style.height = ((sw/tv)*0.2)+"px";
        img.style.margin = ((sw/tv)*0.05)+"px";
        ballRadius = ((sw/tv)*0.2);
   }

   var script = document.createElement("script"); 
   script.src="https://mapa-php.herokuapp.com/2d/phone-ui/script/plugin/websocket.js"; 
   document.body.appendChild(script);
   script.onload = function () {

       img.addEventListener("touchstart",
           function(e) {
           console.log("touchstart", e.changedTouches);
           e.touches = [ e.changedTouches[0] ];
           console.log("touchstart", e.touches[0]);

           ballX = 
           e.touches[0].pageX;
           ballY = 
           e.touches[0].pageY;

           ws.send("PHONE-UI|" +
               playerId + "|CRYSTAL-REMOVED|" +
               ballX+"|"+ballY+"|"+sw+"|"+sh);

           console.log("touchstart", e);
           moveCrystal(ballX, ballY, e);
       });

       img.addEventListener("touchmove", function(e) {
           console.log("touchmove", e.changedTouches);
           e.touches = [ e.changedTouches[0] ];
           console.log("touchmove", e.touches[0]);

           ballX = 
           e.touches[0].pageX;
           ballY = 
           e.touches[0].pageY;

          ws.send("PHONE-UI|" +
              playerId + "|CRYSTAL-MOVED|" +
              ballX+"|"+ballY+"|"+sw+"|"+sh);

          console.log("touchmove", e);
          moveCrystal(ballX, ballY, e);
      });

      img.addEventListener("dblclick", function(e) {
          ws.send("PHONE-UI|" +
              playerId + "|CRYSTAL-RETURNED");

          console.log("dblclick", e);
          returnCrystal(e);
      });

      ws.onmessage = function(e) {
        var msg = e.data.split("|");
        if (msg[0] == "PHONE-UI" &&
            playerId != msg[1]) {
            //log("ws", msg);
            if (msg[2] == "CRYSTAL-REMOVED" ||
                 msg[2] == "CRYSTAL-MOVED") {
                 moveCrystal(
                     parseInt(msg[3]), 
                     parseInt(msg[4]), false, 
                     parseInt(msg[5]), 
                     parseInt(msg[6]),
                 );
                 //alarm.play();
            }           
            if (msg[2] == "CRYSTAL-RETURNED") {
                 returnCrystal();
                 //alarm.pause();
                 //alarm.currentTime = 0;
            }
        }
     };
   };
   //alert("the");
}

function moveCrystal(x, y, e = false, sw2 = sw, sh2 = sh) {
    var wr = sw/sw2;
    var hr =sh/sh2;

    x = x*wr;
    y = y*hr;

    img.style.position =  "fixed";
    img.style.left = (x-(ballRadius))+"px";
    img.style.top = (y-(ballRadius))+"px";
}

function returnCrystal(e = false) {
    ballX = sw/2;
    ballY = sh/2;
    img.style.left = (ballX-(ballRadius))+"px";
    img.style.top = (ballY-(ballRadius))+"px";
}

/*
   // Read this
   7680 x 4320
   var maxWidth = 7680;
   var maxHeight = 4320;
   
   javascript:(function () { var script = document.createElement('script'); script.src="https://mapa-php.herokuapp.com/2d/phone-ui/script/plugin/repixel.js"; document.body.appendChild(script); script.onload = function () { takeScreenShot() } })();

   javascript:(function () { var script = document.createElement('script'); script.src="https://mapa-php.herokuapp.com/2d/phone-ui/script/plugin/repixel.js"; document.body.appendChild(script); script.onload = function () { diamondPlugin() } })();
*/