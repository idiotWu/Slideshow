/**
 * @date     2015/4/16
 * @author   Dolphin<dolphin.w.e@gmail.com>
 *
 * 为 Slideshow 添加按键监听
 */

(function (Slideshow) {
    'use strict';

    var keyMap = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
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

        switch (keyMap[e.keyCode]) {
            case 'left':
            case 'up':
                e.preventDefault();
                return toPrev();
            case 'right':
            case 'down':
                e.preventDefault();
                return toNext();
        }
    });
})(window.Slideshow);