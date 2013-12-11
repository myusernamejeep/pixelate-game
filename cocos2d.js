(function () {
    var d = document;
    var c = {
        COCOS2D_DEBUG:0,
        box2d:false,
        chipmunk:false,
        showFPS:false,
        frameRate:32,
        tag:'gameCanvas',
        SingleEngineFile:'src/lib/Cocos2d-html5-v2.1.1.min.js',
        appFiles:[
            //'src/lib/glfx.js',
            //'src/lib/paper.js',
            //'src/lib/jquery.min.js',
            //'src/lib/jquery.ui.slider.js',
            //'src/lib/demo.js',
            
            'src/lib/howler.min.js',
            /*'touchInsects.js'*/
            'src/ana/Anagram.js',
            'src/ana/Button.js',
            'src/ana/Enemy.js',
            'src/ana/resource.js',
            'src/ana/Item.js',
            'src/ana/Letter.js',
            'src/ana/LetterResult.js',
            'src/ana/Map.js',
            'src/ana/TestController.js',
            'src/ana/Item.js',
            
            'src/ana/App.js',
            'src/ana/Menu.js'
        ]
    };
    window.addEventListener('DOMContentLoaded', function () {
        var s = d.createElement('script');
        s.src = c.SingleEngineFile;
        d.body.appendChild(s);
        document.ccConfig = c;
        s.id = 'cocos2d-html5';
    });
})();
