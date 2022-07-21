var scissorsSFX = new Audio("audio/scissors.wav");

var sw = window.innerWidth;
var sh = window.innerHeight;
var ar = sh/sw;
var vw = 0;
var vh = 0;
var vr = 0;

var canvas = document.getElementById("matter-js");
canvas.width = sw;
canvas.height = sh;

// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;
    
// create an engine
var engine = Engine.create();
    
// create a renderer
var render = Render.create({
    engine: engine,
    canvas: canvas,
    options: {
         width: sw,
         height: sh,
         wireframes: false
         //showPerformance: true
    }
});

// create two boxes and a ground
var squares = [];

var floor0 = 
Bodies.rectangle((sw/4)-12.5, (sh/3)*2,
    (sw/2)-25, 10, {
    isStatic: true,
    render: {
         fillStyle: "#fff",
         strokeStyle: "#000" }});

var floor1 = 
Bodies.rectangle(((sw/4)*3)+12.5, (sh/3)*2,
    (sw/2)-25, 10, {
    isStatic: true,
    render: {
         fillStyle: "#fff",
         strokeStyle: "#000" }});

var left = 
Bodies.rectangle(5, ((sh/3)*2)/2,
    10, (sh/3)*2, {
    isStatic: true,
    render: {
         fillStyle: "#fff",
         strokeStyle: "#000" }});

var right = 
Bodies.rectangle(sw-5, ((sh/3)*2)/2,
    10, (sh/3)*2, {
    isStatic: true,
    render: {
         fillStyle: "#fff",
         strokeStyle: "#000" }});

var ceiling = 
Bodies.rectangle(sw/2, 5,
    sw, 10, {
    isStatic: true,
    render: {
         fillStyle: "#fff",
         strokeStyle: "#000" }});

function matterJs() {
    // add all of the bodies to the world
    Composite.add(engine.world,
    [floor0, floor1, left, right, ceiling]);

    var mouse = Matter.Mouse.create(render.canvas);
    var mouseConstraint = 
    Matter.MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            render: {visible: true}
        }
    });
    render.mouse = mouse;
    Composite.add(engine.world, mouseConstraint);

    // run the renderer
    Render.run(render);
    
    // create runner
    var runner = Runner.create();

    // run the engine
    Runner.run(runner, engine);
}

var cameraKey = false;
$("#key").click(function() {
    if (cameraKey) {
        stopCamera();
        cameraKey = false;
    }
    else {
        startCamera("environment");
        cameraKey = true;
    }
});

var cameraMode = "environment";
function startCamera(mode) {
     if (navigator.mediaDevices) {
          navigator.mediaDevices
          .getUserMedia({ 
          video: {
          facingMode: { exact: mode } }, 
          audio: false })
          .then((stream) => {
               video.srcObject = stream;
               var display = stream.
               getVideoTracks()[0].getSettings();
               vw = display.width;
               vh = display.height;
               vr = vh/vw;
          });
     }
}
function stopCamera() {
     video.srcObject
    .getTracks()
    .forEach(t => t.stop());
}

$(document).ready(function() {
    matterJs();
    getSquares();
    startCamera("environment");

    setInterval(function() {
        engine.gravity.x = (gyro.accX / 9.8) *-1;
        engine.gravity.y = gyro.accY / 9.8;

        var canvas = 
        document.getElementById("camera-canvas");
        var context = canvas.getContext("2d");

        canvas.width = 128;
        canvas.height = 128;
        if (cameraKey) {
            context
            .drawImage(video, 
            ((vw-128)/2)*-1, 
            ((vh-128)/2)*-1, 
            vw, vh);
        }

        var deadSquares = [];
        for(var k in squares) {
            if ((squares[k].position.x > sw+25 ||
                 squares[k].position.x < -25) || 
                 (squares[k].position.y > sh+25 ||
                 squares[k].position.y < -25)) {
                 deadSquares.push(squares[k]);
            }
        }
        for(var k in deadSquares) {
            squares = squares.filter((s) => { 
            s.squareId != deadSquares[k].squareId; });
            deleteSquare(deadSquares[k]);
        }
    }, 100);

   $("#cut").click(function(e) {
         scissorsSFX.play();

         var base64 = 
         document.getElementById("camera-canvas").
         toDataURL();

         var newSquare =
         Bodies.rectangle(74, 74, 50, 50, {
         render: {
         sprite: {
             texture: cameraKey ?
             base64 : "img/placeholder.png",
             xScale: 0.39,
             yScale: 0.39
         },
         fillStyle: "#fff",
         strokeStyle: "#F0EC57",
         lineWidth: 2}});

         newSquare.squareId = new Date().getTime();
         saveSquares([newSquare]);
         squares.push(newSquare);        
         Composite.add(engine.world, [newSquare]);
     });
});

function getSquares() {
     $.getJSON("ajax/square.php", function(data) {
          log("get", data);
          for (var k in data) {
              var square = 
              Bodies.rectangle(data[k].x, data[k].y, 50, 50, {
              render: {
              sprite: {
                  texture: data[k].base64,
                  xScale: 0.39,
                  yScale: 0.39
             },
             fillStyle: "#fff",
             strokeStyle: "#F0EC57",
             lineWidth: 2}});
             square.squareId = new Date().getTime();
             squares.push(square);
         }
        Composite.add(engine.world, squares);
    });
}

function saveSquares(newList, callback=false) {
     var list = [];
     for (var k in newList) {
         list.push({
             squareId: newList[k].squareId,
             base64: newList[k].render.sprite.texture,
             x: newList[k].position.x,
             y: newList[k].position.y
         });
     }

     $.post("ajax/square.php", {
          list: list
          }).done(function(data) { 
              log("post", data);
              if (callback) callback();
     });
}

function deleteSquare(deadSquare) {   
     $.post("ajax/square.php",
         { squareId: deadSquare.squareId },
         function(data) {
         log("post", data);
         Composite.remove(engine.world, deadSquare);
     });
}

/*
var list = [];
for (var k in squares) {
    list.push({
         base64: newSquare.render.sprite.texture,
         x: newSquare.position.x,
         y: newSquare.position.y
    });
}
*/