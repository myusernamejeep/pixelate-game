var LetterAnagram = cc.Sprite.extend({
    _letterId: null,
    active: !0,
    _letter: null,
    rect: function() {
        return cc.rect(0, 0, this._rect.size.width, this._rect.size.height)
    },
    ctor: function(a, b) {
        cc.associateWithNative(this, cc.Sprite);
        this.initWithSpriteFrameName(a + ".png");
        this._letterId = b;
        this._letter = a
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
        return !this.containsTouchLocation(a) || !g_sharedAnagramLayer.isVisible() ? !1 : !0
    },
    onTouchEnded: function() {
        this.active && (this.setDisplayFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame("slot.png")), g_sharedAnagramLayer.computeSelection(this._letterId), this.active = !1)
    },
    touchDelegateRetain: function() {},
    touchDelegateRelease: function() {},
    reset: function() {
        this.setDisplayFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame(this._letter + ".png"));
        this.active = !0
    }
});