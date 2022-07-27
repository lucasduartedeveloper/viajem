var playerId = new Date().getTime();
var fuel = 100;

function matterJs() {
    // add all of the bodies to the world
    Composite.add(engine.world, [
        minuteCircle,
        sencondCircle
    ]);
    
    // run the renderer
    Render.run(render);

    // add mouse
    //render.mouse = mouse;
    //Composite.add(engine.world, mouseConstraint)

    // create runner
    //var runner = Runner.create();

    // run the engine
    //Runner.run(runner, engine);
}

$(document).ready(function() {
    log("log", "$(document).ready(...");
    matterJs();

    setInterval(function() {
    }, 1000);
});

var zoomLevel = 2;
Matter.Events.on(engine, "beforeUpdate", function() {
    if (lockCamera) return;
    Render.lookAt(render, minuteCircle,
    { x: (sw/zoomLevel) - minuteCircle.min.x, 
      y: (sh/zoomLevel) - minuteCircle.min.y });
});

// Test
// create runner
var started = false;
var runner = Runner.create();

window.test = function() {
    if (started) return;
    // add mouse
    render.mouse = mouse;
    Composite.add(engine.world, mouseConstraint);

    // run the renderer
    Runner.run(runner, engine);

    $("#test-run").removeClass("fa-play");
    $("#test-run").addClass("fa-pause");
    started = true;
    return;
    //-- Annotations
    accelerating = true;
    motion = false;
    Matter.Body.set(bodywork,
    "mass", car.mass);
    Matter.Body.set(rearWheel,
    "mass", car.wheels.mass);
    Matter.Body.set(rearWheel,
    "friction", car.wheels.friction);
    Matter.Body.set(rearWheel,
    "frictionStatic",car.wheels.frictionStatic);
    Matter.Body.set(frontWheel, 
    "mass", car.wheels.mass);
    Matter.Body.set(frontWheel, 
    "friction", car.wheels.friction);
    Matter.Body.set(rearWheel,
    "frictionStatic", car.wheels.frictionStatic);
    Matter.Body.set(rearWheelPivot,
    "stiffness",0.5);
    Matter.Body.set(frontWheelPivot,
    "stiffness",0.5);
}