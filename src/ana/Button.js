var AnagramButton = cc.Sprite.extend({
    _buttonId: null,
    parentLayer: null,
    active: !0,
    rect: function() {
        return cc.rect(0, 0, this._rect.size.width, this._rect.size.height)
    },
    ctor: function(a, b) {
        cc.associateWithNative(this, cc.Sprite);
        this._buttonId = a;
        this.parentLayer = b;
        this.initWithSpriteFrameName("s.png")
    },
    onEnter: function() {
        cc.Director.getInstance().getTouchDispatcher().addTargetedDelegate(this, 0, !0);
        this._super()
    },
    onExit: function() {
        cc.Director.getInstance().getTouchDispatcher().removeDelegate(this);
        this._super()
    },
    containsTouchLocation: function(a) {
        var a = a.getLocation(),
            b = this.rect();
        b.origin.x += this.getPosition().x;
        b.origin.y += this.getPosition().y;
        return cc.Rect.CCRectContainsPoint(b, a)
    },
    onTouchBegan: function(a) {
        return !this.containsTouchLocation(a) || !this.parentLayer.isVisible() ? !1 : !0
    },
    onTouchEnded: function() {
        this.active && this.parentLayer.isVisible() && ("shuffle" == this._buttonId ? g_sharedAnagramLayer.shuffleRandomSequence() : "gun" == this._buttonId ? (console.log("GUN"), null != g_sharedGameLayer._currentlySelectedEnemy && (g_sharedGameLayer.destroyEnemy(), console.log("KILL"))) : "up" == this._buttonId ? g_sharedMapLayer.goDirection("up") : "down" == this._buttonId ? g_sharedMapLayer.goDirection("down") : "left" == this._buttonId ? g_sharedMapLayer.goDirection("left") : "right" == this._buttonId ? g_sharedMapLayer.goDirection("right") : console.log("other button is tapped"))
    },
    touchDelegateRetain: function() {},
    touchDelegateRelease: function() {},
    activateButton: function() {
        this.active = !0
    }
});