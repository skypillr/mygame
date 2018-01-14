var gameGlobal = new GameGlobal();
window.onload = function () {
    gameGlobal.init(function () {
        mom = new MomFish();
        mom.init();
    });
    gameGlobal.drawOtherFrame = function () {
        mom.draw();
    }
    gameGlobal.gameLoop();
};
