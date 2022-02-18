var audio0 = new Audio("audio/game_notification.wav");
var audio1 = new Audio("audio/sfx_victory.wav");
var audio2 = new Audio("audio/game_over.wav");
var audio3 = new Audio("audio/getting_hit.wav");
var audio4 = new Audio("audio/creature_dying.wav");

var words = [
   "BOLA DE FOGO",
   "BOLA DE ÁGUA",
   "BOLA DE DINOSSAURO",
   "VOADORA DE GELO",
   "SOCO DA FLORESTA",
   "AMOR FORÇADO"
];

var word = getRandomWord();
var playerId = new Date().getTime();
var points = 0;

$(document).ready(function() {
    ws.onmessage = function(e) {
        var msg = e.data.split("|");
        if (msg[0] == "DIGITE" &&
            playerId != msg[1]) {
            if (msg[2] == "ADD_POINT") {
                 points += 1;
                 audio3.play();
            }
        }
    };

    $("#btn-done").on("click", function() {
         if ($("input").val().toUpperCase() == word) {
               audio3.play();
               word = getRandomWord();
               drawBoard();
               $("input").val("");
               $("input").focus();
               ws.send("DIGITE|"+playerId+"|ADD_POINT");
         }
         else {
              audio2.play();
              $("input").val("");
         }
    });

    $("input").on("input", function() {
        drawBoard($("input").val().toUpperCase());
    });
    drawBoard();
});

function drawBoard(typed = "") {
    var html = "";
    for (var k = 0; k < word.length; k++) {
         if (k < typed.length &&
             typed.charAt(k) == word.charAt(k)) {     
                html += '<div class="letter correct">'+
                word.charAt(k)+
                '</div>';
         }
         else {
             html += '<div class="letter">'+
             word.charAt(k)+
             '</div>';
         }
    }
    $("#board-center").html(html);
}

function getRandomWord() {
    var n = Math.floor(Math.random() * words.length);
    return words[n];
}