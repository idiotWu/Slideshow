/**
 * @date     2015/4/16
 * @author   Dolphin<dolphin.w.e@gmail.com>
 *
 * 为 Slideshow 添加按键监听
 */

(function (Slideshow) {
    'use strict';

    var keyMap = {
        enter: 13,
        left: 37,
        up: 38,
        right: 39,
        down: 40
    };

    var doThrottle = function (fn) {
        var timeStamp, mustRun;

        return function () {
            var now = (new Date).getTime();

            if (!timeStamp) {
                timeStamp = now;
                return fn();
            }

            if (now - timeStamp > 100) {
                clearTimeout(mustRun);
                timeStamp = now;
                return fn();
            }

            mustRun = setTimeout(fn, 100);
        }
    };

    var toNext = doThrottle(Slideshow.next),
        toPrev = doThrottle(Slideshow.prev);

    document.addEventListener('keydown', function (e) {

        switch (e.keyCode) {
            case keyMap.left:
            case keyMap.up:
                e.preventDefault();
                return toPrev();
            case keyMap.enter:
            case keyMap.right:
            case keyMap.down:
                e.preventDefault();
                return toNext();
        }
    });
})(window.Slideshow);