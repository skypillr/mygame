function MomFish() {
    this.x = 0;
    this.y = 0;
    this.angle = 0;
    this.body = new Image();
    this.tail = { img: new Image() };
    this.eye = new Image();
    //this.manyTails = [];
    //this.curTailIndex = 0;
    //this.tailChangeThreshold = 100;
    //this.accumulativeTimes = 0;
    this.tailAnimation = new AnimationSerial();
}

MomFish.prototype.init = function () {

    this.tailAnimation.init(100, function () {
        var manyTails = [];
        var img = new Image();
        img.src = "./resource/images/bigTail0.png";
        manyTails.push(img);
        img = new Image();
        img.src = "./resource/images/bigTail1.png";
        manyTails.push(img);
        img = new Image();
        img.src = "./resource/images/bigTail2.png";
        manyTails.push(img);
        img = new Image();
        img.src = "./resource/images/bigTail3.png";
        manyTails.push(img);
        img = new Image();
        img.src = "./resource/images/bigTail4.png";
        manyTails.push(img);
        img = new Image();
        img.src = "./resource/images/bigTail5.png";
        manyTails.push(img);
        img = new Image();
        img.src = "./resource/images/bigTail6.png";
        manyTails.push(img);
        img = new Image();
        img.src = "./resource/images/bigTail7.png";
        manyTails.push(img);
        return manyTails;
    })
    this.body.src = "./resource/images/bigSwim0.png";
    //this.tail.src = "./resource/images/bigTail0.png"//this.manyTails[this.curTailIndex];
    this.eye.src = "./resource/images/babyEye0.png";
}

//ҡβ��
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

    var deltaX = mx - this.x;  //�������
    var deltaY = my - this.y;  //�������
    var beta = Math.atan2(deltaY, deltaX) + Math.PI;    //Ŀ��Ƕ�
    this.angle = lerpAngle(beta, this.angle, 0.6);    //���ÿһ����ת�ĽǶ�
    //this.SwimTail();
    this.tailAnimation.change(deltaTime, this.tail);
    ctx1.save();     //����֮ǰ�Ļ���
    ctx1.translate(this.x, this.y);      //��ԭ����(this.x , this.y);
    ctx1.rotate(this.angle);
    ctx1.drawImage(this.body, -this.body.width * 0.5, -this.body.height * 0.5);
    ctx1.drawImage(this.tail.img, -this.tail.img.width * 0.5 + 30, -this.tail.img.height * 0.5);
    ctx1.drawImage(this.eye, -this.eye.width * 0.5, -this.eye.height * 0.5);
    ctx1.restore();   //������󷵻ص�֮ǰ�Ļ���
}