/**
 * @date     2015/4/16
 * @author   Dolphin<dolphin.w.e@gmail.com>
 *
 * 为 Slideshow 添加触摸和鼠标事件监听
 */

(function (document, Slideshow) {
    'use strict';

    var pluginLoaded = false;

    Slideshow.registerPlugin('touchhandler', function () {
        if (pluginLoaded) {
            return;
        }

        pluginLoaded = true;

        var me = this;

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

            var moved = {
                x: endPos.x - startPos.x,
                y: endPos.y - startPos.y
            };

            startPos = endPos = null;

            if (Math.abs(moved.x) < 30 && Math.abs(moved.y) < 30) {
                return;
            }

            if (Math.abs(moved.x) > 30 && Math.abs(moved.y) < 75) {
                // horizontal
                return moved.x > 0 ? me.prev() : me.next();
            }

            if (Math.abs(moved.y) > 30 && Math.abs(moved.x) < 75) {
                // vertical
                return moved.y > 0 ? me.prev() : me.next();
            }

            var winner = Math.abs(moved.x) > Math.abs(moved.y) ? moved.x : moved.y;

            return winner > 0 ? me.prev() : me.next();
        };

        document.addEventListener('touchstart', setStart);
        document.addEventListener('touchmove', setMove);
        document.addEventListener('touchend', setEnd);

        document.addEventListener('mousedown', setStart);
        document.addEventListener('mousemove', setMove);
        document.addEventListener('mouseup', setEnd);
    });

})(document, Slideshow);

