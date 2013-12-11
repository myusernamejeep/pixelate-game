var g_sharedGameLayer = null,
    g_sharedAnagramLayer = null,
    g_sharedItemLayer = null,
    g_sharedMapLayer = null,
    dungeon = [
        [0, 1, 2, 0, 0],
        [1, 1, 0, 1, 1],
        [0, 1, 0, 1, 0],
        [0, 1, 3, 1, 0]
    ],
    MyLayer = cc.Layer.extend({
        anagramLayer: null,
        mapLayer: null,
        _enemyArray: [],
        wordToFind: null,
        _currentlySelectedEnemy: null,
        _lifeLayer: null,
        _lifeBar: null,
        _life: 0,
        _continues: 0,
        _continueArray: null,
        _currentDungeonSpot: [],
        ctor: function() {
            cc.associateWithNative(this, cc.Layer);
            this._super()
        },
        init: function() {
            this._super();
            director = cc.Director.getInstance();
            winSize = director.getWinSize();
            "mouse" in sys.capabilities && this.setMouseEnabled(!0);
            "touches" in sys.capabilities && this.setTouchEnabled(!0);

            cc.SpriteFrameCache.getInstance().addSpriteFrames(s_letters_plist);
            var a = cc.Sprite.create(s_gameBackground);
            a.setAnchorPoint(cc.p(0, 0));
            this.addChild(a);
            
            a = cc.Sprite.create(s_anagramBackground);
            a.setAnchorPoint(cc.p(0, 0));
            this.addChild(a);
            
            g_sharedAnagramLayer = this.anagramLayer = AnagramLayer.create();
            this.anagramLayer.setAnchorPoint(cc.p(0, 0));
            this.addChild(this.anagramLayer, 1);
            
            g_sharedMapLayer = this.mapLayer = MapLayer.create();
            this.mapLayer.setAnchorPoint(cc.p(0, 0));
            this.addChild(this.mapLayer, 1);
            this.mapLayer.setVisible(!1);
            
            cc.MenuItemFont.setFontName("Marker Felt");
            cc.MenuItemFont.setFontSize(30);
            var b = cc.MenuItemFont.create("Back", function() {
                this.backToMenu()
            }, this);

            cc.MenuItemFont.setFontSize(10);
            a = cc.MenuItemFont.create("S", function() {
                g_sharedAnagramLayer.shuffleRandomSequence()
            }, this),
            b = cc.Menu.create(b, a);

            b.setPosition(winSize.width - 40, winSize.height - 25);
            //a.setPosition(-(winSize.width - a.getContentSize().width) / 2, -305);
            a.setPosition( a.getContentSize().width , -335);
            this.addChild(b, 2);

            var question = new cc.LabelTTF.create("What 's this photo ?", "Marker Felt", 15, cc.size(300, 15), cc.TEXT_ALIGNMENT_CENTER);
            question.setAnchorPoint(cc.p(0, 0));
            question.setPosition( 0,  winSize.height - 365);
            this.addChild( question );

            cc.MenuItemFont.setFontSize(15);
            var hint = cc.MenuItemFont.create("Hint", function() {
                this.showHint();
            }, this);
            var img = cc.MenuItemFont.create("Photo", function() {
                this.showPhoto();
            }, this);
            var help = cc.MenuItemFont.create("Help", function() {
                this.showHelp();
            }, this);

            var menu = cc.Menu.create(hint, img, help);
            hint.setPosition( hint.getContentSize().width / 2  , 0);
            img.setPosition( img.getContentSize().width / 2 , - 30);
            help.setPosition( help.getContentSize().width / 2 , - 60);
            this.addChild(menu,3); 
            menu.setPosition( 5, winSize.height - 60);
            

            this._life = 3;
            this._lifeLayer = new cc.Layer;
            this._lifeLayer.setAnchorPoint(cc.p(0, 0));
            this._lifeLayer.setPosition(80, 455);
            a = new cc.LabelTTF.create("Life", "Marker Felt", 30, cc.size(30, 15), cc.TEXT_ALIGNMENT_LEFT);
            a.setAnchorPoint(cc.p(0, 0));
            a.setPosition(10, 495);
            this.addChild(a);
            this.addChild(this._lifeLayer);
            
            this.refreshLifeBar();
            
            dungeon = [
                [5, 1, 2, 0, 0],
                [1, 1, 0, 1, 1],
                [0, 1, 0, 1, 0],
                [0, 1, 3, 1, 0]
            ];
            this._continues = 3;
            g_sharedGameLayer = this;
            //this._currentDungeonSpot = [3, 2];
            this._currentDungeonSpot = [0, 0];
            
            this.setGameLayerWithRoom(this._currentDungeonSpot[0], this._currentDungeonSpot[1]);


            var d = draw.init('spiderman.jpg');
            draw_state = 'ready';
            this.showPhoto();

            return !0
        },
        showHint : function() {
            console.log('showHint');
            $('#canvas_hint').show();
            $('#canvas_photo').hide();
            $('#container').hide();
            draw_state = null;
        },
        showPhoto : function() {
            console.log('showPhoto');
            $('#canvas_hint').hide();
            $('#canvas_photo').show();
            $('#container').hide();
            draw_state = 'ready';
        },
        showHelp : function() {
            console.log('showHelp');
            $('#container').show();
            $('#canvas_hint').hide();
            $('#canvas_photo').hide();
            draw_state = null;
        }, 
        setGameLayerWithRoom: function(a, b) {
            this._enemyArray.length = 0;
            if (5 == dungeon[a][b]) {
                for (var c = 1, d = 0; d < c; d++) {
                    var e = new Enemy(words[getRandomInt(0, words.length - 1)]);
                    this.addChild(e);
                    e.setAnchorPoint(cc.p(0, 0));
                    e.setPosition(10 + 90 * d, 160 + 100 * (d % 2));
                    this._enemyArray.push(e);
                    e.is_friend = true;
                }
                this._enemyArray[0]._selected = !0;
                g_sharedGameLayer._currentlySelectedEnemy = this._enemyArray[0];
                g_sharedGameLayer.setAnagramLayer(this._enemyArray[0]._word.description)
            } else if (1 == dungeon[a][b] || 3 == dungeon[a][b]) {
                for (var c = getRandomInt(2, 3), d = 0; d < c; d++) {
                    var e = new Enemy(words[getRandomInt(0, words.length - 1)]);
                    this.addChild(e);
                    e.setAnchorPoint(cc.p(0, 0));
                    e.setPosition(10 + 90 * d, 160 + 100 * (d % 2));
                    this._enemyArray.push(e)
                }
                this._enemyArray[0]._selected = !0;
                g_sharedGameLayer._currentlySelectedEnemy = this._enemyArray[0];
                g_sharedGameLayer.setAnagramLayer(this._enemyArray[0]._word.description)
            } else 2 == dungeon[a][b] ? (e = new Enemy(words[getRandomInt(0, words.length - 1)]), this.addChild(e), e.setPosition(200, 200), this._enemyArray.push(e), this._enemyArray[0]._selected = !0, g_sharedGameLayer._currentlySelectedEnemy = this._enemyArray[0], g_sharedGameLayer.setAnagramLayer(this._enemyArray[0]._word.description)) : 4 == dungeon[a][b] && (console.log("all clear!"), this.mapLayer.cleanMapLayer(), this.mapLayer.initializeMapLayer(), this.mapLayer.toggleMovementButtons(), this.anagramLayer.setVisible(!1), this.mapLayer.setVisible(!0))
        },
        setAnagramLayer: function(a) {
            g_sharedAnagramLayer.initializeAnagramLayer(a)
        },
        removeAnagramLayer: function() {
            g_sharedAnagramLayer.destroy();
            g_sharedAnagramLayer = null
        },
        destroyEnemy: function() {
            this._enemyArray.splice(this._enemyArray.indexOf(this._currentlySelectedEnemy), 1);
            this._currentlySelectedEnemy.destroy();
            this._currentlySelectedEnemy = null;
            this.setAnagramLayer("");
            this.checkBoardState()
        },
        checkBoardState: function() {
            0 == this._enemyArray.length ? (console.log("all clear!"), this.setGameLayerWithRoom(this._currentDungeonSpot[0], this._currentDungeonSpot[1])) : this._enemyArray[0].makeSelected()
        },
        refreshLifeBar: function() {
            this._lifeLayer.removeAllChildren(!0);
            for (var a = 0; a < this._life; a++) lifeSprite = cc.Sprite.create(s_brainIcon), lifeSprite.setScale(0.5, 0.5), lifeSprite.setPosition(40 * a, 0), this._lifeLayer.addChild(lifeSprite)
        },
        updateLife: function(a) {
            this._life += a;
            3 < this._life && (this._life = 3);
            0 >= this._life ? this.backToMenu() : this.refreshLifeBar()
        },
        updateContinue: function(a) {
            this._continues += a;
            0 == this._life && this.updateLife(5)
        },
        backToMenu: function() {
            cc.Director.getInstance().replaceScene(new MenuScene)
        }
    }),
    MyScene = cc.Scene.extend({
        ctor: function() {
            cc.associateWithNative(this, cc.Scene);
            this._super()
        },
        onEnter: function() {
            this._super();
            var a = new MyLayer;
            this.addChild(a);
            a.init()
        }
    });
function getRandomInt(a, b) {
    return Math.floor(Math.random() * (b - a + 1)) + a
};
