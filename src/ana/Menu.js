var g_sharedMenuLayer, MenuLayer = cc.Layer.extend({
    ctor: function() {
        cc.associateWithNative(this, cc.Layer);
        this._super()
    },
    init: function() {
        this._super();
        "mouse" in sys.capabilities && this.setMouseEnabled(!0);
        "touches" in sys.capabilities && this.setTouchEnabled(!0);
        
        var a = cc.Sprite.create(s_optionsBackground);
        a.setAnchorPoint(cc.p(0, 0));
        this.addChild(a);

        a = cc.Sprite.create(s_gameLogo);
        a.setScale(0.5, 0.5);
        a.setAnchorPoint(cc.p(0, 0));
        a.setPosition(cc.p(60, 230));
        this.addChild(a);

        cc.MenuItemFont.setFontName("Marker Felt");
        cc.MenuItemFont.setFontSize(45);
        var a = cc.MenuItemFont.create("Game start", function() {
            this.onGoToGame()
        }, this),
            b = cc.MenuItemFont.create("Dictionary", function() {
                this.onGoToDictionary()
            }, this),
            a = cc.Menu.create(a, b);

        a.alignItemsVerticallyWithPadding(75);
        a.setAnchorPoint(cc.p(0.5, 0.5));
        a.setPosition(cc.p(160, 140));
        this.addChild(a, 2);
        g_sharedMenuLayer = this;
        return !0
    },
    onGoToGame: function() {
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, new MyScene))
    },
    onGoToDictionary: function() {
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, new DictionaryScene))
    }
}),
    MenuScene = cc.Scene.extend({
        ctor: function() {
            cc.associateWithNative(this, cc.Scene);
            this._super()
        },
        onEnter: function() {
            this._super();
            var a = new MenuLayer;
            this.addChild(a);
            a.init()
        }
    });