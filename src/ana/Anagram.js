
var AnagramLayer = cc.Layer.extend({
    _wordToFind: null,
    _resultBlockSequence: [],
    _anagramBlockSequence: [],
    ctor: function() {
        cc.associateWithNative(this, cc.Layer)
    },
    init: function() {
        this._super();
        return !0
    },
    initializeAnagramLayer: function(a) {
        this.cleanAnagramLayer();
        this._wordToFind = a;
        this._resultBlockSequence.length = 0;
        this._anagramBlockSequence.length = 0;
        for (var a = (320 - 50 * this._wordToFind.length) / 2, b = 0; b < this._wordToFind.length; b++) {
            var c = new LetterResult(b);
            this.addChild(c);
            c.setAnchorPoint(cc.p(0, 0));
            c.setPosition(cc.p(a + 50 * b, 10));
            this._resultBlockSequence.push(c);
            c = new LetterAnagram(this._wordToFind[b], b);
            c.setAnchorPoint(cc.p(0, 0));
            this.addChild(c);
            this._anagramBlockSequence.push(c)
        }
        this.shuffleRandomSequence()
    },
    cleanAnagramLayer: function() {
        for (var a = this._anagramBlockSequence.length, b = 0; b < a; b++) this._anagramBlockSequence[b].removeFromParent(), this._resultBlockSequence[b].removeFromParent()
    },
    computeSelection: function(a) {
        var b = -1,
            c = !0;
        for (i = 0; i < this._resultBlockSequence.length; i++) - 1 == this._resultBlockSequence[i]._letterId && (-1 == b ? (this._resultBlockSequence[i].updateLetterDisplayed(a), b = i) : c = !1);
        !0 == c && this.checkIfIsAMatch()
    },
    checkIfIsAMatch: function() {
        var a = "";
        for (i = 0; i < this._resultBlockSequence.length; i++) a += this._wordToFind[this._resultBlockSequence[i]._letterId];
        a == this._wordToFind ? g_sharedGameLayer.destroyEnemy() : console.log("wrong!")
    },
    resetSelectionBlock: function(a) {
        for (i = 0; i < this._anagramBlockSequence.length; i++) this._anagramBlockSequence[i]._letterId == a && this._anagramBlockSequence[i].reset()
    },
    shuffleRandomSequence: function() {
        this._anagramBlockSequence.shuffle();
        var a = (320 - 50 * this._wordToFind.length) / 2;
        for (i = 0; i < this._anagramBlockSequence.length; i++) {
            var b = this._anagramBlockSequence[i],
                c = cc.p(a + 50 * i, 60);
            b.setPosition(c)
        }
    },
    destroy: function() {
        this.removeFromParent()
    }
});
AnagramLayer.create = function() {
    var a = new AnagramLayer;
    return a && a.init() ? a : null
};
AnagramLayer.scene = function() {
    var a = cc.Scene.create(),
        b = AnagramLayer.create();
    a.addChild(b, 1);
    return a
};
Array.prototype.shuffle = function() {
    var a = this.length,
        b, c, d;
    if (0 == a) return !1;
    for (; --a;) b = Math.floor(Math.random() * (a + 1)), c = this[a], d = this[b], this[a] = d, this[b] = c;
    return this
};
