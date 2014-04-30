cc.game.onStart = function(){
    cc.view.setDesignResolutionSize(720, 1280, cc.ResolutionPolicy.FIXED_WIDTH);
	cc.view.resizeWithBrowserSize(true);
    //load resources
    cc.log("before load res");
    cc.LoaderScene.preload(g_resources, function () {
        cc.log("before run MainScene");
        cc.director.runScene(new MainScene());
    }, this);
};
cc.game.run();