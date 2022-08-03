var sock = false;
function loadCbStream(json) {
    if (json && json.hls_source.length > 0) {
        sock = new SockJS(json.wschat_host);
        sock.onopen = function() {
            log("open", json.broadcaster_username);
            /*connectJson.data.user = 
            this.chat_password.username;*/
            connectJson.data.password = 
            this.chat_password;
            connectJson.data.room = 
            json.broadcaster_username;
            connectJson.data.room_password = 
            json.room_password;

            sock.send(JSON.stringify(connectJson));
            $("#broadcaster-msg").html("");
            
        }.bind(json);
        sock.onmessage = function(e) {
           var msgJson = JSON.parse(e.data);
           if (msgJson.args[0] == "1") {
               log('message', msgJson); 
               joinJson.room =
               json.broadcaster_username;
               
               sock.send(JSON.stringify(joinJson));
               return;
           }
           if (msgJson.method == "onRoomMsg" &&
               msgJson.args[0] == this.broadcaster_username) {
               log('message', msgJson); 
               var n = msgJson.args[1].indexOf("\"m\":");
               var x = msgJson.args[1].indexOf("\",", n+6);
               var msg = msgJson.args[1]
                   .substring(n+6, x);
               if (!msg.toLowerCase().includes("lovense") && 
                    !msg.toLowerCase().includes("tipper") && 
                    !msg.toLowerCase().includes("[emoticon")) {
                   $("#broadcaster-msg").html(
                       "<i class=\"fa-solid fa-comment-dots\"></i>"+
                       "&nbsp;"+msg
                   );
               }
           }
           //sock.close();
        }.bind(json);
        sock.onclose = function() {
           console.log("close", this.broadcaster_username);
        }.bind(json);

        loadVideoStream({
            title: json.broadcaster_username,
            url: json.hls_source,
            type: "'application/x-mpegURL"
        });
    }
    else {
        log("info", 
        json.broadcaster_username + " is Offline");
        say(json.broadcaster_username + " is Offline");
    }
}

function loadTwitchStream(info) {    
    //log("twitch", info.data);
    download("teste.html", info.data);

    window.open(info.url, "_blank");
    //loadVideoOnIframe(info.url);
    timeStarted = new Date().getTime();
}

// configuration for video.js
var options = {
    controls: true,
    bigPlayButton: false,
    autoplay: true,
    loop: false,
    fluid: false,
    width: sw,
    height: sw*0.8,
    plugins: {
       // enable videojs-wavesurfer plugin
       wavesurfer: {
           // configure videojs-wavesurfer
           backend: 'MediaElement',
           displayMilliseconds: true,
           debug: true,
           waveColor: 'grey',
           progressColor: 'black',
           cursorColor: 'black',
           hideScrollbar: true
       }
   }
};

$(document).ready(function () {
    window.player = videojs("video-js", options);
    // print version information at startup
    var msg = "Using video.js " + videojs.VERSION +
    " with videojs-wavesurfer " +
    videojs.getPluginVersion("wavesurfer") +
    " and wavesurfer.js " + WaveSurfer.VERSION;
    videojs.log(msg);
});

function loadVideoStream(info) {    
    //log("video", info.data);  
    //download("teste.html", info.data);
    
    $("#temporary-workaround").hide();
    $("#video-layer").show();
    $("#broadcaster-username")
    .text(info.title);
    $("#video-stream").attr("src", 
    info.url);
    $("#video-stream")[0].load();
    $("#video-stream")[0].play();

    // load video from url
    /*player.src({ 
        src: info.url, 
        type: info.type,
        withCredentials: true
    });*/

    //loadVideoOnIframe(info.url);
    timeStarted = new Date().getTime();
}

function loadUploadedVideo(url) {
    loadVideoStream({
         title: url,
         url: url,
         type: "video/mp4"
    });
}

function loadAudio(url) {
    audio.pause();
    audio.src = url;
    audio.play();
}

function loadVideoOnIframe(url) {  
    $("#temporary-workaround").show();
    var iframe = 
    document.getElementById("temporary-workaround");
    iframe.src = url;
    $("#video-layer").show();
    $("#video-stream").hide();
}