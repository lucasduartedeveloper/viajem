var sw = window.innerWidth;
var sh = window.innerHeight;
var ar = sw/sh;
var vw = 0;
var vh = 0;
var vr = 0;

var p2m = 1/100;

// Collision categories
var scenarioCategory = 0x0001,
       objectCategory = 0x0002,
       objectPartCategory = 0x0004;

/*
scenarioCategory
scenarioCategory | objectCategory
scenarioCategory | objectPartCategory
*/

var cars = [{
  name: "Camaro",
  position: { x: 0, y: -80 },
  centre: { x: 85, y: 0 },
  polygon: [
      [-0.4, -0.4], 
      [-1, -0.3], // min x
      [-1, +0.2], 
      [-0.8, +0.3], 
      [+1, +0.3], 
      [+1, -0.1], // max x
      [+0.8, -0.2],
      [+0.4, -0.2],
      [+0.2, -0.4]
  ],
  textures: { 
     chassis: "img/camaro.png",
     wheel: "img/wheel_18.png"
  },
  width: 250,
  height: 200,
  mass: 300,
  wheels: {
      size: 50,
      mass: 50,
      friction: 1,
      frictionStatic: 10,
      rear: { x: -75, y: 25 },
      front: { x: 85, y: 25 }
  }},
  {
  name: "Celta",
  position: { x: 0, y: -80 },
  centre: { x: 85, y: 0 },
  polygon: [
      [-0.4, -0.2], 
      [-1, -0.1], // min x
      [-1, +0.4], 
      [-0.8, +0.6],       
      [+0.9, +0.6], 
      [+1, +0.6],       
      [+1, +0.4], 
      [+0.8,+0.1], // max x
      [+0.4, -0.1],
      [+0.2, -0.4]
  ],
  textures: { 
     chassis: "img/celta.png",
     wheel: "img/wheel.png"
  },
  width: 250,
  height: 200,
  mass: 300,
  wheels: {
      size: 50,
      mass: 50,
      friction: 1,
      frictionStatic: 10,
      rear: { x: -85, y: 45 },
      front: { x: 95, y: 45 }
  }},
];

var car = cars[0];

var canvas = document.getElementById("matter-js");
canvas.width = sw;
canvas.height = sh;

// module aliases
var 
    Common = Matter.Common,
    Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;
    
Common.setDecomp(decomp);

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

// Create car
// create two boxes and a ground
var bodyworkPolygon = [];
for (var k in car.polygon) {
    bodyworkPolygon.push({
        x: car.position.x + car.polygon[k][0] * (car.width/2),
        y: car.position.y + car.polygon[k][1] * (car.height/2)
    });
}
var bodywork = 
polygonFixPosition(
Bodies.fromVertices(
    car.position.x, car.position.y,
    bodyworkPolygon, {
    isStatic: false,
    collisionFilter: {
        category: objectCategory,
        //mask: scenarioCategory | objectCategory
    },
    render: {
        fillStyle: "rgba(255,255,255,0)",
        strokeStyle: "#fff",
        lineWidth: 2,
    }
}), car.position);
Matter.Body.setCentre(bodywork, car.centre, true);

var painting = 
Bodies.rectangle(
    car.position.x, car.position.y,
    car.width, car.height, {
    isSensor: true,
    isStatic: false,
    render: {
        sprite: {
            texture: car.textures.chassis,
            xScale: 0.347,
            yScale: 0.366 
        },
        fillStyle: "#fff",
        lineWidth: 2,
        strokeStyle: "#ccc",
    }
});

var paintingConstraintA = 
Matter.Constraint.create({
    bodyA: painting,
    pointA: { x: -25, y: -25 },
    bodyB: bodywork,
    pointB: { x: -car.centre.x+25, y: -car.centre.y+25 },
    stiffness: 0,
    render: {
        strokeStyle: '#fff',
        lineWidth: 2,
        type: 'line'
    }
});

var paintingConstraintB = 
Matter.Constraint.create({
    bodyA: painting,
    pointA: { x: 25, y: -25 },
    bodyB: bodywork,
    pointB: { x: -car.centre.x-25, y: -car.centre.y+25 },
    stiffness: 0,
    render: {
        strokeStyle: '#fff',
        lineWidth: 2,
        type: 'line'
    }
});

var paintingConstraintZ = 
Matter.Constraint.create({
    bodyA: painting,
    pointA: { x: -25, y: 25 },
    bodyB: bodywork,
    pointB: { x: -car.centre.x+25, y: -car.centre.y+25 },
    stiffness: 0,
    render: {
        strokeStyle: '#fff',
        lineWidth: 2,
        type: 'line'
    }
});

var testWheel =
Bodies.circle(
    0, - (car.wheels.size/2), 
    car.wheels.size/2, {
    isStatic: false,
    collisionFilter: {
        category: objectPartCategory,
        mask: scenarioCategory | objectPartCategory
    },
    render: {
        sprite: {
            texture: car.textures.wheel,
            xScale: 0.5, //0.476,
            yScale: 0.5 //0.476
        },
        fillStyle: "#fff",
        lineWidth: 2,
        strokeStyle: "#000" 
    }
});

var rearWheel =
Bodies.circle(
    car.position.x + car.wheels.rear.x, 
    car.position.y + car.wheels.rear.y, 
    car.wheels.size/2, {
    isStatic: false,
    collisionFilter: {
        category: objectPartCategory,
        mask: scenarioCategory | objectPartCategory
    },
    render: {
        sprite: {
            texture: car.textures.wheel,
            xScale: 0.5, //0.476,
            yScale: 0.5 //0.476
        },
        fillStyle: "#fff",
        lineWidth: 2,
        strokeStyle: "#000" 
    }
});

var frontWheel =
Bodies.circle(
    car.position.x + car.wheels.front.x, 
    car.position.y + car.wheels.front.y, 
    car.wheels.size/2, {
    isStatic: false,
    collisionFilter: {
        category: objectPartCategory,
        mask: scenarioCategory | objectPartCategory
    },
    render: {
        sprite: {
            texture: car.textures.wheel,
            xScale: 0.5, //0.476,
            yScale: 0.5 //0.476
        },
        fillStyle: "#fff",
        strokeStyle: "#000" 
    }
});

var crankshaft = 
Matter.Constraint.create({
     bodyA: rearWheel,
     pointA: { x: 0, y: 0 },
     bodyB: frontWheel,
     pointB: { x: 0, y: 0 },
     stiffness: 1,
     render: {
          strokeStyle: '#fff',
          lineWidth: 2,
          type: 'line'
     }
});

var rearWheelPivot = 
Matter.Constraint.create({
     bodyA: bodywork,
     pointA: {
         x: -car.centre.x + car.wheels.rear.x, 
         y: -car.centre.y + car.wheels.rear.y
     },
     bodyB: rearWheel,
     pointB: { x: 0, y: 0 },
     stiffness: 0.5,
     render: {
          strokeStyle: '#fff',
          lineWidth: 2,
          type: 'line'
     }
});

var frontWheelPivot = 
Matter.Constraint.create({
     bodyA: bodywork,
     pointA: {
        x: -car.centre.x + car.wheels.front.x, 
        y: -car.centre.y + car.wheels.front.y 
     },
     bodyB: frontWheel,
     pointB: { x: 0, y: 0 },
     stiffness: 0.5,
     render: {
          strokeStyle: '#fff',
          lineWidth: 2,
          type: 'line'
     }
});

var planet = 
Bodies.rectangle(0, 274,
1400, 548, {
    isStatic: true,
    collisionFilter: {
        category: scenarioCategory
    },
    render: {
       sprite: {
            texture: "img/map2.jpg",
            xScale: 2,
            yScale: 2
        },
       fillStyle: "#fff",
       strokeStyle: "#000" 
    }
});

var line = 
Bodies.rectangle(1200, 25,
1000, 50, {
    isStatic: true,
    collisionFilter: {
        category: scenarioCategory
    },
    render: {
       fillStyle: "#fff",
       strokeStyle: "#000" 
    }
});

var fuelRefill =
Bodies.circle(
    350, -100, 50, {
    isStatic: true,
    isSensor: true,
    collisionFilter: {
        category: scenarioCategory,
        //mask: scenarioCategory | objectPartCategory
    },
    render: {
        sprite: {
            texture: "img/fuel.png",
            xScale: 0.138, //0.476,
            yScale: 0.138 //0.476
        },
        fillStyle: "#fff",
        lineWidth: 2,
        strokeStyle: "#000" 
    }
});

// Sign
var rawPolygon = [
    [-1, -0.9], 
    [-1, +0.1], 
    [-0.1, +0.1], 
    [-0.1, +1], 
    [+0.1, +1], 
    [+0.1, +0.1], 
    [+1, +0.1], 
    [+1, -0.9],  
    [+0.1, -0.9], 
    [+0.1, -1], 
    [-0.1, -1], 
    [-0.1, -0.9]
];
var signPolygon = [];
for (var k in rawPolygon) {
    signPolygon.push({
        x: rawPolygon[k][0] * 50,
        y: rawPolygon[k][1] * 100
    });
}
var sign = 
polygonFixPosition(
Matter.Bodies.fromVertices(
    -(350+50), -100,
    signPolygon, {
    isStatic: true,
    collisionFilter: {
        category: scenarioCategory
    },
    render: {
        fillStyle: "rgba(255,255,255,0)",
        strokeStyle: "#fff",
        lineWidth: 2,
    }
}), { x: -(350+50), y: -100 });
for (var k in sign.parts) {
    sign.parts[k].render.fillStyle = 
    gradientColor(k, sign.parts.length);
}

// Géssica
var signConstraint = 
Matter.Constraint.create({
     bodyA: sign,
     pointA: { x: 0, y: 90 },
     bodyB: planet,
     pointB: { x: (-350+50), y: -264 },
     stiffness: 0.3,
     render: {
          strokeStyle: '#fff',
          lineWidth: 2,
          type: 'line'
     }
});

// Loop
var rawPolygon = [
    [-0, +0.9], 
    [-0, +1]
];
var loopPolygon = [];
var oddVertices = [];
for (var a = 0; a < 270; a+=5) {
    for (var k in rawPolygon) {
        if (k % 2 == 0) {
            loopPolygon.push(
                rotate(0, 0,
                rawPolygon[k][0]*500, 
                rawPolygon[k][1]*500, a)
            );
        }
        else {
            oddVertices.push(
                rotate(0, 0,
                rawPolygon[k][0]*500,
                rawPolygon[k][1]*500, a)
            );
        }
    }
}
loopPolygon =
loopPolygon.concat(oddVertices.reverse());
var loop = 
Matter.Bodies.fromVertices(
    2550, -550,
    loopPolygon, {
    isStatic: true,
    collisionFilter: {
        category: scenarioCategory
    },
    render: {
        fillStyle: "rgba(255,255,255,0)",
        strokeStyle: "#fff",
        lineWidth: 2,
    }
});
for (var k in loop.parts) {
   loop.parts[k].render.fillStyle = 
   randomColor();
}

// Loop
var rawPolygon = [
    [-0, +0.9], 
    [-0, +1]
];
var loopPolygon = [];
var oddVertices = [];
for (var a = -45; a < 180; a+=5) {
    for (var k in rawPolygon) {
        if (k % 2 == 0) {
            loopPolygon.push(
                rotate(0, 0,
                rawPolygon[k][0]*1000, 
                rawPolygon[k][1]*1000, a)
            );
        }
        else {
            oddVertices.push(
                rotate(0, 0,
                rawPolygon[k][0]*1000,
                rawPolygon[k][1]*1000, a)
            );
        }
    }
}
loopPolygon =
loopPolygon.concat(oddVertices.reverse());
var loop1 = 
Matter.Bodies.fromVertices(
    2850, 0,
    loopPolygon, {
    isStatic: true,
    collisionFilter: {
        category: scenarioCategory
    },
    render: {
        fillStyle: "rgba(255,255,255,0)",
        strokeStyle: "#fff",
        lineWidth: 2,
    }
});
for (var k in loop1.parts) {
   loop1.parts[k].render.fillStyle = 
   gradientColor(k, loop1.parts.length);
}

// Home indicator
var rawPolygon = [
    [-1, -0.1], 
    [-1, +0.1], 
    //[-0.5, +0.7], 
    //[-0.7, +0.5], //x
    [-0.8, +0.1], 
    [+1, +0.1], 
    [+1, -0.1], 
    [-0.8, -0.1],  
    //[-0.7, -0.5], 
    //[-0.5, -0.7]
];
var startIndicatorPolygon = [];
for (var k in rawPolygon) {
    startIndicatorPolygon.push({
        x: rawPolygon[k][0] * 25,
        y: rawPolygon[k][1] * 25
    });
}
var startIndicator = 
Matter.Bodies.fromVertices(
    0, 0,
    startIndicatorPolygon, {
    isSensor: true,
    isStatic: true,
    collisionFilter: {
        category: scenarioCategory
    },
    render: {
        fillStyle: "rgba(255,255,255,0)",
        strokeStyle: "#fff",
        lineWidth: 2,
    }
});
for (var k in startIndicator.parts) {
   startIndicator.parts[k].render.fillStyle = 
   gradientColor(k, startIndicator.parts.length);
}

var mouse = Matter.Mouse.create(render.canvas);
var mouseConstraint = 
Matter.MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        render: {visible: true}
    }
});