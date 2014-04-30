##Notice


#### MoveTo
cc.MoveTo.create(Delay,x,y); HTML5可用，JSB不可用
正确方式
cc.MoveTo.create(kDelaySecond,cc.p());

#### ZOrder
在Android如果不设ZOrder,会导致精灵渲染层级跟实际添加的不一致。

