var audio = new Audio("audio/heart-beat.wav");
audio.loop = true;

var gears = [
    { id: "gear-0", pageX: 0, pageY: 0 },
    { id: "gear-1",pageX: 0, pageY: 0 },
    { id: "gear-2",pageX: 0, pageY: 0 }
];

var playerId = new Date().getTime();
var selected = gears[0];
var playing = false;

$(document).ready(function() {
    audio.play();

    // this will disable right-click on all images
    $("body").on("contextmenu",function(e){
         return false;
    });

    $(".gear").on("touchstart", function(e) {
         playing = true;
         //console.log(e.target.id);
         selected = gears.filter((g) => g.id == e.target.id)[0];
         //console.log(selected);

         $("#"+selected.id).removeClass("spin");
         selected.pageX = 
               e.originalEvent.touches[0].pageX;
         selected.pageY = 
               e.originalEvent.touches[0].pageY;
         //console.log(selected);
    });
    
    $(".gear").on("touchmove", function(e) {
         selected.pageX = 
               e.originalEvent.touches[0].pageX;
         selected.pageY = 
               e.originalEvent.touches[0].pageY;
         //console.log(selected);
         
         $("#"+selected.id)
               .css("left", (selected.pageX-25)+"px");
         $("#"+selected.id)
               .css("top", (selected.pageY-25)+"px");
    });

   $(".gear").on("touchend", function(e) {
         ws.send("HEART|"+playerId+"|SET_GEARS|"+
                      JSON.stringify(gears));
         for (var k in gears) {
              if (gears[k].pageX >= 0) {
                   audio.pause();
                   $(".heart").removeClass("beat");
                   $("#"+gears[k].id).removeClass("spin");
              }
         }
    });

    ws.onmessage = function(e) {
        var msg = e.data.split("|");
        if (msg[0] == "HEART" &&
            playerId != msg[1]) {
            if (msg[2] == "GET_GEARS") {
                 ws.send("HEART|"+playerId+"|SET_GEARS|"+
                      JSON.stringify(gears));
            }
            else if (msg[2] == "SET_GEARS") {
                 gears = JSON.parse(msg[3]);
                 for (var k in gears) {
                    if (gears[k].pageX == 0) break;
                    $("#"+gears[k].id).removeClass("spin");
                    $("#"+gears[k].id)
                       .css("left", (gears[k].pageX-25)+"px");
                    $("#"+gears[k].id)
                       .css("top", (gears[k].pageY-25)+"px");
                 }
            }
        }
    };

    ws.send("HEART|"+playerId+"|GET_GEARS");
});

