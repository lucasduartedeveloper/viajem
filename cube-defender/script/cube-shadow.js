var shadow = new Image();
shadow.width = 256;
shadow.height = 256;
shadow.src = "img/gradient.png";

function addShadow() {
    var cnv = document.createElement('canvas');
    cnv.width = 128;
    cnv.height = 128;
    var ctx = cnv.getContext('2d');
    
    var faces = $("#cube-container img");
    for (var k = 0; k < 6; k++) {
        var img = new Image();
        img.width = 128;
        img.height = 128;
        img.k = k;
    
        img.onload = function (e) {
             ctx.drawImage(this, 0, 0, 128, 128);

             ctx.save();
             ctx.translate(cnv.width / 2, cnv.height / 2);
             ctx.rotate(45 * (Math.PI/180));
             ctx.drawImage(shadow, -64, 64, 256, 256);
             ctx.restore();

             faces[this.k].src = cnv.toDataURL();
        }
        var c = cube.filter(o => o.face_id == k);
        var n = c.length > 0 ? c[0].face_id : k;

        img.src = (k+1) > cube.length ? 
        baseImages[k] : 
        cube[n].base64;
    }
}