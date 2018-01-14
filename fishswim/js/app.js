// JavaScript source code
var appCavans = {};
appCavans.drawBackground = function (can,backGroundUrl) {
    var img = new Image();
    img.src = backGroundUrl; 
    var ctx = can.getContext("2d");
    ctx.drawImage(img, 0, 0, can.width, can.height);
}



