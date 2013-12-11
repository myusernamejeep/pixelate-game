var ItemLayer = cc.Layer.extend({
    _gunButton: null,
    _lifeButton: null,
    _foodButton: null,
    ctor: function() {
        cc.associateWithNative(this, cc.Layer)
    },
    init: function() {
        this._super();
        this._gunButton = new AnagramButton("gun", this);
        this.addChild(this._gunButton, 0, 4);
        this._gunButton.setPosition(cc.p(60, 100));

        this._lifeButton = new AnagramButton("life", this);
        this.addChild(this._lifeButton, 0, 4);
        this._lifeButton.setPosition(cc.p(160, 100));

        this._foodButton = new AnagramButton("food", this);
        this.addChild(this._foodButton, 0, 4);
        this._foodButton.setPosition(cc.p(260, 100));
        
        return !0
    },
    initializeItemLayer: function() {},
    cleanItemLayer: function() {},
    destroy: function() {
        this.removeFromParent()
    }
});
ItemLayer.create = function() {
    var a = new ItemLayer;
    return a && a.init() ? a : null
};
ItemLayer.scene = function() {
    var a = cc.Scene.create(),
        b = ItemLayer.create();
    a.addChild(b, 1);
    return a
};