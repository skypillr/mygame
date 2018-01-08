var requestAnimFrame = (function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function ( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
            return window.setTimeout(callback, 1000 / 60);
        };
})();

function lerpDistance(aim, cur, ratio) {   //aim：目标   cur：当前   ratio：百分比     每一次趋近的距离
    var delta = cur - aim;
    return aim + delta * ratio;
}

function lerpAngle(a, b, t) {     //每一次旋转的角度
    var d = b - a;
    if (d > Math.PI) d = d - 2 * Math.PI;
    if (d < -Math.PI) d = d + 2 * Math.PI;
    return a + d * t;
}

//用于物体动画播放类
function AnimationSerial()
{
    this.thresholdFrameChange = Number.MAX_VALUE;
    this.frameImgs = [];
    this.frameImgsWithDurationTime = [];//[{img,durationTime}]
    this.curIndex = 0;
    this.accumulativeTimes = 0;
}
AnimationSerial.prototype.init = function (thresholdframechange,frameimgsFunc)
{
    this.thresholdFrameChange = thresholdframechange;
    if (typeof (frameimgsFunc) !== "function")
    {
        throw "frameimgsFunc is not function";
    }
    var framesImgs = frameimgsFunc();

    if (framesImgs[0].hasOwnProperty("img") && framesImgs[0].hasOwnProperty("durationTime")) {
        this.frameImgsWithDurationTime = framesImgs;
    } else {
        this.frameImgs = framesImgs;
    }

}
/*
匀速切换
配合frameImgs使用
*  objContainImg={img:new Image()} 参数objContainImg实现接口{img:new Image()}
**/
AnimationSerial.prototype.change = function (deltaTimeEveryTime,objContainImg) {
    
    this.accumulativeTimes++;
    if (this.accumulativeTimes * deltaTimeEveryTime > this.thresholdFrameChange) {
        this.curIndex++;
        this.accumulativeTimes = 0;
        if (this.curIndex < this.frameImgs.length) {
            objContainImg.img = this.frameImgs[this.curIndex]
            return this.frameImgs[this.curIndex];
        } else {
            this.curIndex = 0;
            objContainImg.img = this.frameImgs[0];
            return this.frameImgs[0];
        }
        
    }
    objContainImg.img = this.frameImgs[this.curIndex]
    return this.frameImgs[this.curIndex];
    
}
/*
非匀速切换
配合frameImgsWithDurationTime使用
*  objContainImg={img:new Image()} 参数objContainImg实现接口{img:new Image()}
**/
AnimationSerial.prototype.changeBaseOnImgDurationTime = function (deltaTimeEveryTime, objContainImg) {

    this.accumulativeTimes++;
    if (this.accumulativeTimes * deltaTimeEveryTime > this.frameImgsWithDurationTime[this.curIndex].durationTime) {
        this.curIndex++;
        this.accumulativeTimes = 0;
        if (this.curIndex < this.frameImgsWithDurationTime.length) {
            objContainImg.img = this.frameImgsWithDurationTime[this.curIndex].img;
            return this.frameImgsWithDurationTime[this.curIndex].img;
        } else {
            this.curIndex = 0;
            objContainImg.img = this.frameImgsWithDurationTime[0].img;
            return this.frameImgsWithDurationTime[0].img;
        }

    }
    objContainImg.img = this.frameImgsWithDurationTime[this.curIndex].img
    return this.frameImgsWithDurationTime[this.curIndex].img;

}