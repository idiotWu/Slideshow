/**
 * @date     2015/5/8
 * @author   Dolphin<dolphin.w.e@gmail.com>
 *
 * 监听 hashchange
 */

(function (window, Slideshow) {
    'use strict';

    var pluginLoaded = false;

    Slideshow.registerPlugin('hashchange', function () {
        if (pluginLoaded) {
            return;
        }

        var me = this;
        pluginLoaded = true;

        window.addEventListener('hashchange', function () {
            var indexChain = location.hash.slice(1),
                currentIndexChain = me.getCurrentFrame().indexChain;

            if (!indexChain || indexChain === currentIndexChain) {
                return;
            }

            me.jumpTo(indexChain);
        });

    });
})(window, Slideshow);