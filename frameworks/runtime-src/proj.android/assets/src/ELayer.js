/**
 * Layer base class
 * Created by hector on 14-4-25.
 */

var ELayer = cc.Layer.extend({
    _className:"ELayer",
    ctor:function(){
        this._super();
        this.init();
        _winSize=cc.director.getWinSize();
    }
});

