/**
 * @date     2015/4/16
 * @author   Dolphin<dolphin.w.e@gmail.com>
 *
 * 为 Slideshow 添加按键监听
 */
(function (document, Slideshow) {
    'use strict';

    var pluginLoaded = false;

    Slideshow.registerPlugin('keybind', function () {

        if (pluginLoaded) {
            return;
        }

        pluginLoaded = true;

        var me = this;

        var keyMap = {
            enter: 13,
            left: 37,
            up: 38,
            right: 39,
            down: 40
        };

        document.addEventListener('keydown', function (e) {

            switch (e.keyCode) {
                case keyMap.left:
                case keyMap.up:
                    e.preventDefault();
                    return me.prev();
                case keyMap.enter:
                case keyMap.right:
                case keyMap.down:
                    e.preventDefault();
                    return me.next();
            }
        });
    });
})(document, Slideshow);