var Enemy = cc.Sprite.extend({
    _selected: !1,
    _word: null,
    _timer: 0,
    _timeTick: 0,
    _timeBar: null,
    _timeBarBackground: null,
    rect: function() {
        return cc.rect(0, 0, this._rect.size.width, this._rect.size.height)
    },
    ctor: function(a) {
        cc.associateWithNative(this, cc.Sprite);
        this._word = a;
        0 == getRandomInt(0, 1) ? this.initWithFile(s_zombie1) : this.initWithFile(s_zombie2);
        this.setScale(0.5, 0.5);
        this._timer = 10;

        this._timeBarBackground = new cc.Sprite;
        this._timeBarBackground.initWithFile(s_timeBarBack, cc.rect(0, 0, 116, 18));
        this._timeBarBackground.setAnchorPoint(cc.p(0, 0));
        this._timeBarBackground.setPosition(10, this.getContentSize().height - 60);
        this.addChild(this._timeBarBackground);

        a = cc.Sprite.create(s_timeBar);
        this._timeBar = cc.ProgressTimer.create(a);
        this._timeBar.setType(cc.PROGRESS_TIMER_TYPE_BAR);
        this._timeBar.setPercentage(100);
        this._timeBar.setMidpoint(cc.p(0, 0));
        this._timeBar.setBarChangeRate(cc.p(1, 0));
        this._timeBar.setAnchorPoint(cc.p(0, 0));
        this._timeBar.setPosition(125, this.getContentSize().height - 60 + 18);
        this.addChild(this._timeBar);

        this._timeBarBackground.setScale(2, 2);
        this._timeBar.setScale(2, 2);
        console.log(this._word);
        
        this.scheduleUpdate();
        return this
    },
    update: function(a) {
        this._selected && (this._timeTick += a, this._timeTick > this._timer ? (this.hit(), this._timeBar.setPercentage(100), this._timeTick = 0) : this._timeBar.setPercentage(100 - 10 * this._timeTick))
    },
    hit: function() {
        if (this.is_friend){
            g_sharedGameLayer.updateLife(0);
            return;
        }
        g_sharedGameLayer.updateLife(-1)
    },
    destroy: function() {
        var a = words.indexOf(this._word);
        words[a].found = !0;
        this.removeFromParent()
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
        return !this.containsTouchLocation(a) ? !1 : !0
    },
    onTouchEnded: function() {
        g_sharedGameLayer._currentlySelectedEnemy != this && this.makeSelected()
    },
    makeSelected: function() {
        g_sharedGameLayer._currentlySelectedEnemy && (g_sharedGameLayer._currentlySelectedEnemy._selected = !1);
        this._selected = !0;
        g_sharedGameLayer._currentlySelectedEnemy = this;
        g_sharedGameLayer.setAnagramLayer(this._word.description)
    },
    touchDelegateRetain: function() {},
    touchDelegateRelease: function() {}
});


