// JavaScript source code

var lastTime, deltaTime;
var can1, ctx1;
var canWidth, canHeight;
var mom;
var mx = 0, my = 0;
var init = function () {
    lastTime = Date.now();

    can1 = document.getElementById("canvan1");
    ctx1 = can1.getContext("2d");
    canWidth = can1.width;
    canHeight = can1.height;
    can1.addEventListener("click", onMouseMove)

    mom = new MomFish();
    mom.init();
 
}
var onMouseMove = function (e) {
    if (e.offsetX || e.layerX) {
        mx = e.offsetX == undefined ? e.layerX : e.offsetX;
        my = e.offsetY == undefined ? e.layerY : e.offsetY;
    }
    console.log(mx);
}
var drawFrame = function () {
    ctx1.clearRect(0, 0, canWidth, canHeight);  
    appCavans.drawBackground(can1, "./resource/images/background.jpg");
    mom.draw();
}
var gameLoop = function () {
    requestAnimFrame(gameLoop);
    var thisTime = Date.now();
    deltaTime = thisTime - lastTime;
    lastTime = thisTime;
    drawFrame();
}

window.onload = function () {
    init();
    gameLoop();
};
