var LetterResult = cc.Sprite.extend({
    _letterId: null,
    rect: function() {
        return cc.rect(0, 0, this._rect.size.width, this._rect.size.height)
    },
    ctor: function() {
        cc.associateWithNative(this, cc.Sprite);
        this.initWithSpriteFrameName("slot.png");
        this._letterId = -1
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
        -1 != this._letterId && (this.setDisplayFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame("slot.png")), g_sharedAnagramLayer.resetSelectionBlock(this._letterId), this._letterId = -1)
    },
    touchDelegateRetain: function() {},
    touchDelegateRelease: function() {},
    updateLetterDisplayed: function(a) {
        this.setDisplayFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame(g_sharedAnagramLayer._wordToFind[a] + ".png"));
        this._letterId = a
    }
});
