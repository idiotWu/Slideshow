/**
 * @date     2015/4/16
 * @author   Dolphin<dolphin.w.e@gmail.com>
 *
 * 为 Slideshow 添加触摸和鼠标事件监听
 */

(function (Slideshow) {
    'use strict';

    var getPos = function (event) {
        var data = event.touches ? event.touches[0] : event;

        return {
            x: data.pageX,
            y: data.pageY
        }
    };

    var startPos, endPos;

    var setStart = function (event) {
        startPos = getPos(event);
    };

    var setMove = function (event) {
        if (!startPos) {
            return;
        }

        event.preventDefault();
        var curPos = getPos(event);

        if (!endPos) {
            endPos = curPos;
            return;
        }

        if ((startPos.x < curPos.x && curPos.x < endPos.x) ||
           (startPos.x > curPos.x && curPos.x > endPos.x)) {
            //     +
            // <<<<<
            // >>
            //
            // or
            //
            //     +
            //     >>>>>>
            //         <<
            startPos.x = endPos.x;
        }

        if ((startPos.y < curPos.y && curPos.y < endPos.y) ||
            (startPos.y > curPos.y && curPos.y > endPos.y)) {
            startPos.y = endPos.y;
        }

        endPos = curPos;
    };

    var setEnd = function () {
        if (!endPos) {
            return;
        }

        if (endPos.x - startPos.x > 30 || endPos.y - startPos.y > 30) {
            return Slideshow.prev();
        }

        if (endPos.x - startPos.x < -30 || endPos.y - startPos.y < -30) {
            return Slideshow.next();
        }

        startPos = endPos = null;
    };

    document.addEventListener('touchstart', setStart);
    document.addEventListener('touchmove', setMove);
    document.addEventListener('touchend', setEnd);

    document.addEventListener('mousedown', setStart);
    document.addEventListener('mousemove', setMove);
    document.addEventListener('mouseup', setEnd);
})(window.Slideshow);
