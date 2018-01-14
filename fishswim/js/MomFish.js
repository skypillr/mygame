function MomFish() {
    this.x = 0;
    this.y = 0;
    this.angle = 0;
    this.body = new Image();
    this.tail = { img: new Image() };
    this.eye = {img: new Image()};
    //this.manyTails = [];
    //this.curTailIndex = 0;
    //this.tailChangeThreshold = 100;
    //this.accumulativeTimes = 0;
    this.tailAnimation = new AnimationSerial();
    this.eyeAnimation = new AnimationSerial();
}

MomFish.prototype.init = function () {

    this.tailAnimation.init(100, function () {
        var manyTails = [];
        var img = new Image();
        img.src = "./resource/image/bigTail0.png";
        manyTails.push(img);
        img = new Image();
        img.src = "./resource/image/bigTail1.png";
        manyTails.push(img);
        img = new Image();
        img.src = "./resource/image/bigTail2.png";
        manyTails.push(img);
        img = new Image();
        img.src = "./resource/image/bigTail3.png";
        manyTails.push(img);
        img = new Image();
        img.src = "./resource/image/bigTail4.png";
        manyTails.push(img);
        img = new Image();
        img.src = "./resource/image/bigTail5.png";
        manyTails.push(img);
        img = new Image();
        img.src = "./resource/image/bigTail6.png";
        manyTails.push(img);
        img = new Image();
        img.src = "./resource/image/bigTail7.png";
        manyTails.push(img);
        return manyTails;
    })
    this.eyeAnimation.init(5000, function () {
        var manyEyes = [];
        var img = new Image();
        img.src = "./resource/image/babyEye0.png";
        manyEyes.push({ img: img, durationTime:5000});
        img = new Image();
        img.src = "./resource/image/babyEye1.png";
        manyEyes.push({ img: img, durationTime: 100 });
        return manyEyes;
    });
    this.body.src = "./resource/image/bigSwim0.png";
    //this.tail.src = "./resource/images/bigTail0.png"//this.manyTails[this.curTailIndex];
    //this.eye.src = "./resource/images/babyEye0.png";
}

//摇尾巴
//MomFish.prototype.SwimTail = function () {
//    this.accumulativeTimes++;
//    if (this.accumulativeTimes * deltaTime > this.tailChangeThreshold)
//    {
//        this.curTailIndex++;
//        if (this.curTailIndex < this.manyTails.length) {
//            this.tail.src = this.manyTails[this.curTailIndex];
//        } else {
//            this.curTailIndex = 0;
//            this.tail.src = this.manyTails[0];
//        }
//        this.accumulativeTimes = 0;
//    }
//}

MomFish.prototype.draw = function () {
    this.x = lerpDistance(this.x, mx, 0.0006);
    this.y = lerpDistance(this.y, my, 0.0006);

    var deltaX = mx - this.x;  //横坐标差
    var deltaY = my - this.y;  //纵坐标差
    var beta = Math.atan2(deltaY, deltaX) + Math.PI;    //目标角度
    this.angle = lerpAngle(beta, this.angle, 0.6);    //获得每一次旋转的角度
    //this.SwimTail();
    this.tailAnimation.change(deltaTime, this.tail);
    this.eyeAnimation.changeBaseOnImgDurationTime(deltaTime, this.eye);
    ctx1.save();     //保存之前的画布
    ctx1.translate(this.x, this.y);      //把原点变成(this.x , this.y);
    ctx1.rotate(this.angle);
    ctx1.drawImage(this.body, -this.body.width * 0.5, -this.body.height * 0.5);
    ctx1.drawImage(this.tail.img, -this.tail.img.width * 0.5 + 30, -this.tail.img.height * 0.5);
    ctx1.drawImage(this.eye.img, -this.eye.img.width * 0.5, -this.eye.img.height * 0.5);
    ctx1.restore();   //操作完后返回到之前的画布
}