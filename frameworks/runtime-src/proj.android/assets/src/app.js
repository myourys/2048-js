var kMatrix = 4;
var kDelaySecond = 0.15;

var MainLayer = ELayer.extend({
    _tables: null,
    _maxNum: 0,
    _score: 0,
    _lock: false,
    ctor:function(){
        this._super();
        this.init();
    },
    onEnter: function(){
        this._super();
        this.doEnter();
    }
});

/***
 *
 * @param direct right left top right
 */
MainLayer.prototype.combine =function(direct){
    cc.log("combine "+direct);
    if(this._lock)
        return;
    var needNew = false;
    if(direct == "top"){
        needNew =this.combineTop();
    }
    else if(direct == "bottom"){
        needNew =this.combineBottom();
    }
    else if(direct == "left"){
        needNew =this.combineLeft();
    }
    else if(direct == "right"){
        needNew =this.combineRight();
    }
    if(!needNew){
        return;
    }
    this._lock = true;
    this.runAction(
        cc.Sequence.create(
            cc.DelayTime.create(kDelaySecond+0.05),
            cc.CallFunc.create(this.newNumber,this)
        )
    );
};

MainLayer.prototype.combineRight= function(){
    var tables = this._tables;
    var needNew = false;
    for(var i = 0; i< kMatrix;i++){
        var bCell = tables[i][kMatrix-1];
        for(var j= kMatrix-2;j>= 0; j--){
            var t = tables[i][j];
            if(t.data.number == 0)
                continue;

            //合并
            if(t.data.number == bCell.data.number){
                bCell.data.number++;
                var actionTo = cc.MoveTo.create(kDelaySecond,cc.p(bCell.getPosition().x,bCell.getPosition().y));
                t.data.numberLb.runAction(cc.Sequence.create(
                        actionTo,
                        cc.RemoveSelf.create(),
                        cc.CallFunc.create(this.freshNum,this,bCell))
                );
                if(bCell.data.col > 0) {
                    bCell = tables[bCell.data.row][bCell.data.col - 1];
                }
                t.data.number =0;
                t.data.numberLb =null;
                needNew = true;
            }
            // 为空，移动过来
            else if(bCell.data.number==0)
            {
                var actionTo = cc.MoveTo.create(kDelaySecond,cc.p(cc.p(bCell.getPosition().x,bCell.getPosition().y)));
                t.data.numberLb.runAction(actionTo);
                bCell.data.number = t.data.number;
                bCell.data.numberLb = t.data.numberLb;
                t.data.number =0;
                t.data.numberLb =null;
                needNew = true;
            }
            else{
                //是前一个，不动
                if(t.data.col == bCell.data.col -1)
                    bCell = t;
                else{ //移动到前一个
                    bCell = tables[bCell.data.row][bCell.data.col -1];
                    var actionTo = cc.MoveTo.create(kDelaySecond,cc.p(cc.p(bCell.getPosition().x,bCell.getPosition().y)));
                    t.data.numberLb.runAction(actionTo);
                    bCell.data.number = t.data.number;
                    bCell.data.numberLb = t.data.numberLb;
                    t.data.number = 0;
                    t.data.numberLb = null;
                    needNew = true;
                }
            }

        }
    }

    return needNew;
};

MainLayer.prototype.combineLeft= function(){
    var tables = this._tables;
    var needNew = false;
    for(var i = 0; i< kMatrix;i++){
        var bCell = tables[i][0];
        for(var j= 1;j< kMatrix; j++){
            var t = tables[i][j];
            if(t.data.number == 0)
                continue;

            //合并
            if(t.data.number == bCell.data.number){
                bCell.data.number++;
                var actionTo = cc.MoveTo.create(kDelaySecond,cc.p(bCell.getPosition().x,bCell.getPosition().y));
                t.data.numberLb.runAction(cc.Sequence.create(
                        actionTo,
                        cc.RemoveSelf.create(),
                        cc.CallFunc.create(this.freshNum,this,bCell))
                );
                if(bCell.data.col < kMatrix-1) {
                    bCell = tables[bCell.data.row][bCell.data.col + 1];
                }
                t.data.number =0;
                t.data.numberLb =null;
                needNew = true;
            }
            // 为空，移动过来
            else if(bCell.data.number==0)
            {
                var actionTo = cc.MoveTo.create(kDelaySecond,cc.p(bCell.getPosition().x,bCell.getPosition().y));
                t.data.numberLb.runAction(actionTo);
                bCell.data.number = t.data.number;
                bCell.data.numberLb = t.data.numberLb;
                t.data.number =0;
                t.data.numberLb =null;
                needNew = true;
            }
            else{
                //是前一个，不动
                if(t.data.col == bCell.data.col + 1)
                    bCell = t;
                else{ //移动到前一个
                    bCell = tables[bCell.data.row][bCell.data.col +1];
                    var actionTo = cc.MoveTo.create(kDelaySecond,cc.p(bCell.getPosition().x,bCell.getPosition().y));
                    t.data.numberLb.runAction(actionTo);
                    bCell.data.number = t.data.number;
                    bCell.data.numberLb = t.data.numberLb;
                    t.data.number = 0;
                    t.data.numberLb = null;
                    needNew = true;
                }
            }

        }
    }

    return needNew;
};

MainLayer.prototype.combineTop= function(){
    var tables = this._tables;
    var needNew = false;
    for(var j = 0; j< kMatrix;j++){
        var bCell = tables[0][j];
        for(var i= 1;i < kMatrix; i++){
            var t = tables[i][j];
            if(t.data.number == 0)
                continue;

            //合并
            if(t.data.number == bCell.data.number){
                bCell.data.number++;
                var actionTo = cc.MoveTo.create(kDelaySecond,cc.p(bCell.getPosition().x,bCell.getPosition().y));
                t.data.numberLb.runAction(cc.Sequence.create(
                        actionTo,
                        cc.RemoveSelf.create(),
                        cc.CallFunc.create(this.freshNum,this,bCell))
                );
                if(bCell.data.row < kMatrix-1) {
                    bCell = tables[bCell.data.row+1][bCell.data.col];
                }
                t.data.number =0;
                t.data.numberLb =null;
                needNew = true;
            }
            // 为空，移动过来
            else if(bCell.data.number==0)
            {
                var actionTo = cc.MoveTo.create(kDelaySecond,cc.p(bCell.getPosition().x,bCell.getPosition().y));
                t.data.numberLb.runAction(actionTo);
                bCell.data.number = t.data.number;
                bCell.data.numberLb = t.data.numberLb;
                t.data.number =0;
                t.data.numberLb =null;
                needNew = true;
            }
            else{
                //是前一个，不动
                if(t.data.row == bCell.data.row + 1)
                    bCell = t;
                else{ //移动到前一个
                    bCell = tables[bCell.data.row+1][bCell.data.col];
                    var actionTo = cc.MoveTo.create(kDelaySecond,cc.p(bCell.getPosition().x,bCell.getPosition().y));
                    t.data.numberLb.runAction(actionTo);
                    bCell.data.number = t.data.number;
                    bCell.data.numberLb = t.data.numberLb;
                    t.data.number = 0;
                    t.data.numberLb = null;
                    needNew = true;
                }
            }

        }
    }

    return needNew;
};

MainLayer.prototype.combineBottom= function(){
    var tables = this._tables;
    var needNew = false;
    for(var j = 0; j< kMatrix;j++){
        var bCell = tables[kMatrix-1][j];
        for(var i= kMatrix-2;i>= 0; i--){
            var t = tables[i][j];
            if(t.data.number == 0)
                continue;

            //合并
            if(t.data.number == bCell.data.number){
                bCell.data.number++;
                var actionTo = cc.MoveTo.create(kDelaySecond,cc.p(bCell.getPosition().x,bCell.getPosition().y));
                t.data.numberLb.runAction(cc.Sequence.create(
                        actionTo,
                        cc.RemoveSelf.create(),
                        cc.CallFunc.create(this.freshNum,this,bCell))
                );
                if(bCell.data.row < kMatrix-1) {
                    bCell = tables[bCell.data.row+1][bCell.data.col];
                }
                t.data.number =0;
                t.data.numberLb =null;
                needNew = true;
            }
            // 为空，移动过来
            else if(bCell.data.number==0)
            {
                var actionTo = cc.MoveTo.create(kDelaySecond,cc.p(bCell.getPosition().x,bCell.getPosition().y));
                t.data.numberLb.runAction(actionTo);
                bCell.data.number = t.data.number;
                bCell.data.numberLb = t.data.numberLb;
                t.data.number =0;
                t.data.numberLb =null;
                needNew = true;
            }
            else{
                //是前一个，不动
                if(t.data.row == bCell.data.row -1)
                    bCell = t;
                else{ //移动到前一个
                    bCell = tables[bCell.data.row-1][bCell.data.col];
                    var actionTo = cc.MoveTo.create(kDelaySecond,cc.p(bCell.getPosition().x,bCell.getPosition().y));
                    t.data.numberLb.runAction(actionTo);
                    bCell.data.number = t.data.number;
                    bCell.data.numberLb = t.data.numberLb;
                    t.data.number = 0;
                    t.data.numberLb = null;
                    needNew = true;
                }
            }

        }
    }

    return needNew;
};

/***
 * 更新数字
 * @param execNode 调用者
 * @param cell 参数
 */
MainLayer.prototype.freshNum = function(execNode,cell){

    if(cell.data.numberLb == null) {
        var lb = cell.data.numberLb = ccui.ImageView.create();
        lb.setPosition(cell.getPosition().x,cell.getPosition().y);
        this.addChild(lb);

        var cellLabel = ccui.Text.create();
        cellLabel.setFontSize(60);
        cellLabel.setPosition(lb.getSize().width/2,lb.getSize().height/2);
        cellLabel.setName("num");
        lb.addChild(cellLabel);
    }

    var num = Math.pow(2,cell.data.number);
    if(num.toString() != cell.data.numberLb.getChildByName("num").getStringValue()){
        var t = cell.data.number;
        while(t>5){
            t = t -5;
        }
        t = 6 -t;
        cell.data.numberLb.loadTexture(t+".png",ccui.Widget.PLIST_TEXTURE);
        cell.data.numberLb.getChildByName("num").setText(num);
        cell.data.numberLb.runAction(cc.Sequence.create(
            cc.ScaleTo.create(0.1,1.1),
            cc.ScaleTo.create(0.1,1)
        ));
        if(cell.data.number > this._maxNum) {
            this._maxNum = cell.data.number;
        }
        this._score += num;
    }

};

/**
 * 产生一个新的数字
 */
MainLayer.prototype.newNumber = function(){
    var lb = ccui.ImageView.create();
    var num = 1;
    if(Math.random() <0.3){
        num = 2;
    }

    var empty =[];
    for(var i = 0;i<kMatrix;i++){
        for(var j = 0;j<kMatrix;j++){
            if(this._tables[i][j].data.number==0){
                empty.push(this._tables[i][j]);
            }
        }
    }

    if(empty.length == 0){
        cc.log("is not empty cell!");
        return;
    }

    var cell = empty[Math.floor(Math.random()*empty.length)];

    var t = num;
    while(t>5){
        t = t -5;
    }
    t = 6 -t;
    lb.loadTexture(t+".png",ccui.Widget.PLIST_TEXTURE);
    lb.setPosition(cell.getPosition().x,cell.getPosition().y);
    this.addChild(lb,1);

    var cellLabel = ccui.Text.create();
    cellLabel.setFontSize(60);
    cellLabel.setName("num");
    cellLabel.setPosition(lb.getContentSize().width/2,lb.getContentSize().height/2);
    lb.addChild(cellLabel);

    cellLabel.setText(Math.pow(2,num));
    cell.data.number = num;
    cell.data.numberLb = lb;

    if(empty.length == 1 && this.isGameOver()){
        cc.log("Game Over");
    }
    this._lock = false;
};

MainLayer.prototype.isGameOver = function(){
    for(var i = 0;i<kMatrix-1;i++){
        for(var j=0;j<kMatrix;j++){
            if(this._tables[i][j].data.number == this._tables[i+1][j].data.number){
                return false;
            }
        }
    }

    for(var i =0;i<kMatrix;i++){
        for(var j=0;j<kMatrix-1;j++){
            if(this._tables[i][j].data.number == this._tables[i][j+1].data.number) {
                return false;
            }
        }
    }

    return true;
};

MainLayer.prototype.doEnter = function () {
    var tt= this;
    cc.spriteFrameCache.addSpriteFrames(res.Main_plist);

//        else if ('mouse' in cc.sys.capabilities) {
//            cc.eventManager.addListener({
//                event: cc.EventListener.MOUSE,
//                onMouseUp: function (event) {
//                    event.getCurrentTarget().processEvent(event.getLocation());
//                }
//            }, this);
//        }
    if( 'touches' in cc.sys.capabilities ) {
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: tt.onTouchBegan.bind(tt),
            //onTouchMoved: this.onTouchMoved,
            onTouchEnded: tt.onTouchEnded.bind(tt)//,
            //onTouchCancelled: this.onTouchCancelled
        }, tt);
    } else {
        cc.log("TOUCH-ONE-BY-ONE test is not supported on desktop");
    };
    if ('keyboard' in cc.sys.capabilities){
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed:function(key, event) {
                if(key==38||key==87)
                    tt.combine("top");
                if(key==40||key==83)
                    tt.combine("bottom");
                if(key==37||key==65)
                    tt.combine("left");
                if(key==39||key==68)
                    tt.combine("right");
            }
//            ,
//            onKeyReleased:function(key, event) {
//                cc.log("Key up:" + key);
//            }
        }, this);
    }

    this.initX = 9;
    this.initY = 850;
    this.cellSize = 162;
    this.cellSpace = 18;

    this._tables = new Array(kMatrix);
    for (var j = 0; j < kMatrix; j++) {
        var sprites = new Array(kMatrix);
        for (var i = 0; i < kMatrix; i++) {
            var px = this.initX + this.cellSize / 2 + i * (this.cellSize + this.cellSpace);
            var py = this.initY + this.cellSize / 2 - j * (this.cellSize + this.cellSpace);
            var cell = ccui.ImageView.create();
            cell.loadTexture("6.png",ccui.Widget.PLIST_TEXTURE);
            cell.attr({
                x:px,
                y:py
            });
            this.addChild(cell,0);
            cell.data = {col: i, row: j, number: 0, numberLb: null};
            sprites[i] = cell;
        }
        this._tables[j] = sprites;
    }

    this.newNumber();
    this.newNumber();
};


MainLayer.prototype.onTouchBegan = function(touch,event){
    this._prePostion = touch.getLocation();
    cc.log("touch Begin");
    return true;
};

MainLayer.prototype.onTouchEnded = function(touch,event){
    var posCur = touch.getLocation();
    var posOld = this._prePostion;
    var diff = cc.pSub(posCur,posOld);
    if(Math.abs(diff.x)> Math.abs(diff.y)){
        if(diff.x >20){
            this.combine("right");
        }else if(diff.x<-20){
            this.combine("left");
        }
    }
    else{
        if(diff.y >20){
            this.combine("top");
        }else if(diff.y<-20){
            this.combine("bottom");
        }
    }
    cc.log("touch end:("+posCur.x+","+posCur.y+"),("+posOld.x+","+posOld.y+")");
};


var MainScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        cc.log("before create Layer");
        var layer = new MainLayer();
        cc.log("end create Layer");
        this.addChild(layer);
    }
});

