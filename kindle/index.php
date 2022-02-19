<!DOCTYPE html>
<html>
     <head>
     <title>v0</title>
     <style>
         html, body {
                font-size: 30px;
                text-align: center;
                width: 100%;
                height: 100%;
         }
     </style>
     <script>
          // Create an XMLHttpRequest object
          var xhttp = new XMLHttpRequest();

          // Define a callback function
          xhttp.onload = function() {
               var data = JSON.parse(this.responseText);
               document
               .getElementById("frame-data")
               .innerText = data[0].base64;
          }

          // Send a request
          xhttp.open("GET", "/camera/ajax/camera.php?cameraId=0");
          xhttp.send();

          var updated = 0;
          setInterval(function() {
                updated += 1;
                document
                .getElementById("update-test")
                .innerText = updated;
          }, 250);
     </script>
     <!-- <script src="websocket.js?v=2"></script> -->
     </head>
     <body>
         <p id="update-test">0</p>
         <img id="frame-data" />
         <p id="server-info">CONNECTING...</p>
     </body>
</html>