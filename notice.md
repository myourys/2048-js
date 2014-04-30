##Notice


#### MoveTo
cc.MoveTo.create(Delay,x,y); 看官方文档是新增的方法，但是HTML5可用，JSB不可用
只能使用传统的cc.p的方式
cc.MoveTo.create(kDelaySecond,cc.p());

#### ZOrder
在Android如果不设ZOrder,会导致精灵渲染层级跟实际添加的顺序不一致，所以必须设ZOrder。


#### ccui的问题

ccui控件的子控件在web里面是居中，在JSB里面是左下角。。。。。。
