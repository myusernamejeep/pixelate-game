var MapLayer = cc.Layer.extend({
    _upButton: null,
    _downButton: null,
    _leftButton: null,
    _rightButton: null,
    _arrayOfMapItems: [],
    ctor: function() {
        cc.associateWithNative(this, cc.Layer)
    },
    init: function() {
        this._super();
        this._upButton = new AnagramButton("up", this);
        this.addChild(this._upButton, 0, 4);
        this._upButton.setPosition(cc.p(160, 100));
        this._downButton = new AnagramButton("down", this);
        this.addChild(this._downButton, 0, 4);
        this._downButton.setPosition(cc.p(160, 50));
        this._leftButton = new AnagramButton("left", this);
        this.addChild(this._leftButton, 0, 4);
        this._leftButton.setPosition(cc.p(60, 50));
        this._rightButton = new AnagramButton("right", this);
        this.addChild(this._rightButton, 0, 4);
        this._rightButton.setPosition(cc.p(260, 50));
        return !0
    },
    initializeMapLayer: function() {
        for (var a = 0; a < dungeon.length; a++) for (var b = 0; b < dungeon[a].length; b++) if (0 != dungeon[a][b]) {
            var c = new cc.Sprite,
                d = cc.TextureCache.getInstance().addImage(s_letters);
            a == g_sharedGameLayer._currentDungeonSpot[0] && b == g_sharedGameLayer._currentDungeonSpot[1] ? c.initWithTexture(d, cc.rect(200, 0, 50, 50)) : c.initWithTexture(d, cc.rect(50 * dungeon[a][b], 0, 50, 50));
            this.addChild(c, 0, 4);
            c.setAnchorPoint(cc.p(0, 0));
            c.setPosition(cc.p(20 + 60 * b, 375 - 60 * a));
            this._arrayOfMapItems.push(c)
        }
    },
    cleanMapLayer: function() {
        for (var a = this._arrayOfMapItems.length, b = 0; b < a; b++) this._arrayOfMapItems[b].removeFromParent();
        this._arrayOfMapItems.length = 0
    },
    toggleMovementButtons: function() {
        for (var a = [this._upButton, this._downButton, this._leftButton, this._rightButton], b = 0; b < a.length; b++) a[b].setVisible(!0);
        0 == g_sharedGameLayer._currentDungeonSpot[0] ? this._upButton.setVisible(!1) : 0 == dungeon[g_sharedGameLayer._currentDungeonSpot[0] - 1][g_sharedGameLayer._currentDungeonSpot[1]] && this._upButton.setVisible(!1);
        3 == g_sharedGameLayer._currentDungeonSpot[0] ? this._downButton.setVisible(!1) : 0 == dungeon[g_sharedGameLayer._currentDungeonSpot[0] + 1][g_sharedGameLayer._currentDungeonSpot[1]] && this._downButton.setVisible(!1);
        0 == g_sharedGameLayer._currentDungeonSpot[1] ? this._leftButton.setVisible(!1) : 0 == dungeon[g_sharedGameLayer._currentDungeonSpot[0]][g_sharedGameLayer._currentDungeonSpot[1] - 1] && this._leftButton.setVisible(!1);
        4 == g_sharedGameLayer._currentDungeonSpot[1] ? this._rightButton.setVisible(!1) : 0 == dungeon[g_sharedGameLayer._currentDungeonSpot[0]][g_sharedGameLayer._currentDungeonSpot[1] + 1] && this._rightButton.setVisible(!1)
    },
    goDirection: function(a) {
        g_sharedMapLayer.setVisible(!1);
        g_sharedAnagramLayer.setVisible(!0);
        dungeon[g_sharedGameLayer._currentDungeonSpot[0]][g_sharedGameLayer._currentDungeonSpot[1]] = 4;
        "up" == a && (g_sharedGameLayer._currentDungeonSpot = [g_sharedGameLayer._currentDungeonSpot[0] - 1, g_sharedGameLayer._currentDungeonSpot[1]]);
        "down" == a && (g_sharedGameLayer._currentDungeonSpot = [g_sharedGameLayer._currentDungeonSpot[0] + 1, g_sharedGameLayer._currentDungeonSpot[1]]);
        "left" == a && (g_sharedGameLayer._currentDungeonSpot = [g_sharedGameLayer._currentDungeonSpot[0], g_sharedGameLayer._currentDungeonSpot[1] - 1]);
        "right" == a && (g_sharedGameLayer._currentDungeonSpot = [g_sharedGameLayer._currentDungeonSpot[0], g_sharedGameLayer._currentDungeonSpot[1] + 1]);
        g_sharedGameLayer.setGameLayerWithRoom(g_sharedGameLayer._currentDungeonSpot[0], g_sharedGameLayer._currentDungeonSpot[1])
    },
    destroy: function() {
        this.removeFromParent()
    }
});
MapLayer.create = function() {
    var a = new MapLayer;
    return a && a.init() ? a : null
};
MapLayer.scene = function() {
    var a = cc.Scene.create(),
        b = MapLayer.create();
    a.addChild(b, 1);
    return a
};
