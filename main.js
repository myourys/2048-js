cc.game.onStart = function(){
    if(cc.sys.isNative) {
        cc.view.setDesignResolutionSize(720, 1280, cc.ResolutionPolicy.FIXED_WIDTH);
        cc.view.resizeWithBrowserSize(true);
    }
    else{
        cc.view.setDesignResolutionSize(720, 1280,cc.ResolutionPolicy.SHOW_ALL);
        //cc.view.resizeWithBrowserSize(true);
    }
    //load resources
    cc.LoaderScene.preload(g_resources, function () {
        cc.log("before run MainScene");
        cc.director.runScene(new MainScene());
    }, this);
};
cc.game.run();