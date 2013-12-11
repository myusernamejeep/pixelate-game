var director = null,
    winSize = null,
    PLATFORM_JSB = 1,
    PLATFORM_HTML5 = 2,
    PLATFORM_ALL = PLATFORM_JSB | PLATFORM_HTML5,
    LINE_SPACE = 40,
    curPos = cc.p(0, 0),
    TestController = cc.LayerGradient.extend({
        _itemMenu: null,
        _beginPos: 0,
        isMouseDown: !1,
        ctor: function() {
            this._super();
            director = cc.Director.getInstance();
            winSize = director.getWinSize();
            var a = cc.Sprite.create(s_optionsBackground);
            a.setAnchorPoint(cc.p(0, 0));
            this.addChild(a);

            cc.MenuItemFont.setFontName("Marker Felt");
            cc.MenuItemFont.setFontSize(30);
            a = cc.MenuItemFont.create("Back", function() {
                this.onGoToMenu()
            }, this);
            a = cc.Menu.create(a);
            a.setPosition(winSize.width - 40, winSize.height - 30);

            this._itemMenu = cc.Menu.create();
            for (var b = 0, c = words.length; b < c; b++) {
                var d = cc.LabelTTF.create(words[b].found ? words[b].description : "XXXXXXXXXX", "Marker Felt", 24),
                    d = cc.MenuItemLabel.create(d, this.onMenuCallback, this);
                this._itemMenu.addChild(d, b + 1E4);
                d.setPosition(winSize.width / 2, winSize.height - (b + 1) * LINE_SPACE);
                "browser" == sys.platform ? d.setEnabled(words[b].platforms & PLATFORM_HTML5) : d.setEnabled(words[b].platforms & PLATFORM_JSB)
            }

            this._itemMenu.setContentSize(cc.size(winSize.width, (words.length + 1) * LINE_SPACE));
            this._itemMenu.setPosition(curPos);
            this.addChild(this._itemMenu);
            this.addChild(a, 1);
            
            "touches" in sys.capabilities ? this.setTouchEnabled(!0) : "mouse" in sys.capabilities && this.setMouseEnabled(!0)
        },
        onEnter: function() {
            this._super();
            this._itemMenu.setPosition(this._itemMenu.getPosition().x, TestController.YOffset)
        },
        onMenuCallback: function() {},
        onGoToMenu: function() {
            cc.Director.getInstance().replaceScene(new MenuScene)
        },
        onTouchesMoved: function(a) {
            this.moveMenu(a[0].getDelta());
            return !0
        },
        onMouseDragged: function(a) {
            this.moveMenu(a.getDelta());
            return !0
        },
        onScrollWheel: function(a) {
            this.moveMenu({
                y: -a.getWheelDelta()
            });
            return !0
        },
        moveMenu: function(a) {
            var b = this._itemMenu.getPosition(),
                a = b.y + a.y;
            0 > a && (a = 0);
            a > (words.length + 1) * LINE_SPACE - winSize.height && (a = (words.length + 1) * LINE_SPACE - winSize.height);
            this._itemMenu.setPosition(b.x, a)
        }
    });
TestController.YOffset = 0;
var words = [{
    description: "brain",
    found: !1
}, {
    description: "zombie",
    found: !1
}, {
    description: "game",
    found: !1
}, {
    description: "bonus",
    found: !1
}, {
    description: "great",
    found: !1
}, {
    description: "maniac",
    found: !1
}, {
    description: "tokyo",
    found: !1
}, {
    description: "error",
    found: !1
}, {
    description: "castle",
    found: !1
}, {
    description: "dragon",
    found: !1
}, {
    description: "magic",
    found: !1
}, {
    description: "sword",
    found: !1
}, {
    description: "shield",
    found: !1
}, {
    description: "puzzle",
    found: !1
}],
    DictionaryScene = cc.Scene.extend({
        ctor: function() {
            cc.associateWithNative(this, cc.Scene);
            this._super()
        },
        onEnter: function() {
            this._super();
            var a = new TestController;
            this.addChild(a);
            a.init()
        }
    });
