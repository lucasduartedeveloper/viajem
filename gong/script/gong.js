var audio = new Audio("audio/phone-lock.wav");
var alarm = new Audio("audio/battleship-alarm.wav");
var coin = new Audio("audio/coin.wav");
var frogJump = new Audio("audio/frog-sfx.wav");
var victory = new Audio("audio/sfx-victory.wav");

function formatarAudio(buffer) {
    var array8 = new Uint8Array(buffer);
    var buffer = array8.buffer;
    var array16 = new Int16Array(buffer, buffer.byteOffset, buffer.byteLength / 2).slice(22);
    var wavHeader = array8.slice(0, 44);
    //console.log(wavHeader);

    var tamanhoBloco = Math.floor(array16.length / 100);
    var quantidade = Math.floor(array16.length / tamanhoBloco);
    var novoArray = [];

    for (var i = 0; i <= quantidade; i++) {
        var somaPos = 0;
        var somaNeg = 0;
        for (var j = 0; j < tamanhoBloco; j++) {
            var m = (i * tamanhoBloco) + j;
            if ((m+1) <= array16.length) {
                if (array16[m] > 0) {
                    somaPos += array16[m];
                }
                else {
                    somaNeg += array16[m];
                }
            }
        }
        novoArray
        .push({ 
            somaPos: Math.floor(
            (100 / 32767) * (somaPos / tamanhoBloco)),
            somaNeg: Math.floor(
            (100 / 32768) * (somaNeg / tamanhoBloco)),
        });
    }

    //console.log(array16);
    console.log(novoArray);
    desenharWave(novoArray);
    return novoArray;
}

function desenharWave(array) {
    var canvas = document.getElementById("wave");
    var context = canvas.getContext( '2d' );

    canvas.width = 1000;
    canvas.height = 1000;

    for (var k = 0; k < array.length; k++) {
        context.beginPath(); // always start a new line with beginPath
        context.strokeStyle = "#f00";
        context.lineWidth = 5;

        /*// start position
        context.moveTo(2.5+((k * 2) * 5), 
            50 - ((array[k].somaPos*2) + 1)
        ); 
        context.lineTo(2.5+((k *2) * 5), 
            50 - ((array[k].somaNeg*2) - 2)
        );*/

        context.arc(450, 450, 100, 0, 2 * Math.PI);
        context.stroke();

        context.beginPath(); // always start a new line with beginPath
        context.strokeStyle = "#f00";
        context.strokeStyle = "#fff";
        context.lineWidth = 5;

        context.arc(
            500 -array[k].somaPos*5, 
            500 -array[k].somaPos*5, 
            array[k].somaPos*10, 
            0, 2 * Math.PI);
        context.stroke(); // actually draw the line
    }

    $("#wave").removeClass("animated left-in");
    $("#wave").addClass("animated left-in");
    return canvas.toDataURL();
}

// Audio
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext = new AudioContext();
var recorder;
var gumStream;
var input;

function recordAudio() {
navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
        gumStream = stream;
        input = audioContext
            .createMediaStreamSource(stream);
        recorder =  new Recorder(input, {
            numChannels: 1
        });
    recorder.record();
    }).catch(e=>console.log(e));
}

var recording = false;
var recordInterval = false;

// Botão de gravação
$(document).ready(function() {
    
    $("#mic").click(function(e) {
        if (!recording) {
            recording = true;
            $("#mic").addClass("active");
            $("#mic i").removeClass("bi-mic-mute-fill");
            $("#mic i").addClass("bi-mic-fill");    
            
            alarm.pause();
            audio.onended = function() {
                recordAudio();
                recordInterval =
                setInterval(function () {
                    saveRecording();
                }, 1000);
            };
            audio.play();
        }
        else {
            recording = false;
            $("#mic").removeClass("active");
            $("#mic i").removeClass("bi-mic-fill");
            $("#mic i").addClass("bi-mic-mute-fill");
            
            clearInterval(recordInterval);
            recorder.stop();
        }
    });

    $("#file").click(function() { $("#file-selector").click(); });
    $("#file-selector").on("change", function (e) {
        var reader = new FileReader();
        reader.readAsArrayBuffer(e.target.files[0]); 
        reader.onloadend = function() {
            var buffer = reader.result;
            desenharWave(
                formatarAudio(buffer));
        };
    });
});

function gong(audio) {
    var play = false;
    for (var k in audio) {
        if (audio[k].somaPos > 10 ||
             audio[k].somaNeg < -10) {
             play = true;
        }
    }
    if (play) {
        victory.play()
    }
}

function saveRecording() {
    recorder.stop();
    gumStream.getAudioTracks()[0]
    .stop();
    recorder.exportWAV(function(blob) { 
    var audio = 
        new Audio(URL
        .createObjectURL(blob));
        //audio.play();
        var reader = new FileReader();
        reader.readAsArrayBuffer(blob); 
        reader.onloadend = function() {
            var buffer = reader.result;
            reader.readAsDataURL(blob);
            reader.onloadend = function() {
                var base64 = reader.result;
                var audio = formatarAudio(buffer)

                desenharWave(audio);
                recordAudio();
                gong(audio);
            };
        };
    });
}