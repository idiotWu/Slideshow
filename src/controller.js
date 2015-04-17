/**
 * @date     2015/4/12
 * @author   Dolphin<dolphin.w.e@gmail.com>
 *
 * Slideshow 控制流
 */

var Slideshow = function (Slideshow) {
    'use strict';

    var flow, flatFlow, currentIndex, length;

    var callbacks = [];

    /**
     * 异步调用，减少迭代器带来的阻塞
     *
     * @param {Function} fn
     */
    var asap = function (fn) {
        if (fn && typeof fn === 'function') {
            setTimeout(fn, 0);
        }
    };

    /**
     * 执行 onchange 回调
     *
     * @param {String} type: 变换类型
     */
    var doCallback = function (type) {
        var currentNtr = flatFlow[currentIndex],
            currentElem = currentNtr.element,
            progress = currentIndex / length;

        location.hash = currentNtr.indexChain;

        callbacks.forEach(function (fn) {
            asap(function () {
                fn.call(currentNtr, type, currentElem, progress);
            });
        })
    };

    /**
     * 切换指定索引之前的所有元素的 class
     *
     * @param {NodeTree} targetNtr: 目标 NTR
     */
    var showUntil = function (targetNtr) {
        var indexArr = targetNtr.indexChain.split('.'),
            parentNtr = flow.getChild(indexArr[0]);

        if (!parentNtr) {
            return;
        }

        var ntrList = parentNtr.flatten(true),
            targetIndex = targetNtr.index;

        ntrList.forEach(function (ntr) {
            var elem = ntr.element,
                ntrIndex = ntr.index;

            if (ntrIndex <= targetIndex) {
                elem.classList.add('show');

                if (ntr.depth === 1 || ntrIndex === targetIndex) {
                    elem.classList.remove('played');
                } else {
                    elem.classList.add('played');
                }
            } else {
                elem.classList.remove('played');
                elem.classList.remove('show');
            }
        });
    };

    /**
     * Slideshow 初始化
     *
     * @param {String} className: 目标元素的 class
     * @param {Element} [startContainer]: 查找起始父节点，默认为 body
     *
     * @return {NodeTree}
     */
    Slideshow.init = function (className, startContainer) {
        if (!document.body.classList) {
            throw new Error('unsupported browser');
        }

        flow = Slideshow.finder(className, startContainer);
        flatFlow = flow.flatten();
        currentIndex = 0;
        length = flatFlow.length - 1;
        callbacks.length = 0;

        if (flatFlow.length) {
            flatFlow[0].element.classList.add('show');
        }

        if (location.hash) {
            asap(function () {
                // 异步调用，保证在 Slideshow 初始化完成后触发
                try {
                    Slideshow.jumpTo(location.hash.slice(1));
                } catch (e) {};
            });
        }

        return flow;
    };

    /**
     * 前进到下一帧
     *
     * @return {Element | Null}: 下一帧的作用对象
     */
    Slideshow.next = function () {
        var nextNtr = flatFlow[currentIndex + 1];

        if (!nextNtr) {
            return null;
        }

        var curNtr = flatFlow[currentIndex],
            nextElem = nextNtr.element,
            nextIndexChain = nextNtr.indexChain;

        if (curNtr.depth !== 1) {
            // 子项添加已播放标记
            curNtr.element.classList.add('played');
        }

        if (nextNtr.depth === 1) {
            var prevNtr = flow.getChild(nextIndexChain - 1),
                prevElem = prevNtr.element;

            prevElem.classList.remove('show');
            prevElem.classList.add('played');

            // 修正下一页面的状态
            showUntil(nextNtr);
        } else {
            nextElem.classList.add('show');
        }

        currentIndex++;

        doCallback('next');

        return nextElem;
    };

    /**
     * 后退到上一帧
     *
     * @return {Element | Null}: 上一帧的作用对象
     */
    Slideshow.prev = function () {
        if (!currentIndex) {
            return null;
        }

        var curNtr = flatFlow[currentIndex],
            prevNtr = flatFlow[--currentIndex],
            prevElem = prevNtr.element;

        if (curNtr.depth === 1) {
            // 修正前一页面的状态
            showUntil(prevNtr);
        } else {
            prevElem.classList.remove('played');
        }

        curNtr.element.classList.remove('show');

        doCallback('prev');

        return prevElem;
    };

    /**
     * 跳转到指定帧
     *
     * @param {String | Number} indexChain: 递推式索引，同 ntr.getChild
     */
    Slideshow.jumpTo = function (indexChain) {
        if (indexChain === undefined) {
            throw new TypeError('missing argument indexChain');
        }

        indexChain = indexChain.toString();

        if (!indexChain.match(/^(?:\d\.?)*\d$/)) {
            throw new TypeError('unrecognized indexChain format, require ^(\\d\\.?)*\\d$');
        }

        var curIndexChain = flatFlow[currentIndex].indexChain,
            targetNtr = flow.getChild(indexChain);

        if (indexChain === curIndexChain || !targetNtr) {
            return;
        }

        currentIndex = targetNtr.index;

        var currentLevelOneIndex = curIndexChain.split('.')[0],
            targetLevelOneIndex = indexChain.split('.')[0];

        if (targetLevelOneIndex !== currentLevelOneIndex) {
            flow.children[currentLevelOneIndex].element.classList.remove('show');
        }

        // 显示目标链
        showUntil(targetNtr);

        // 修正首级元素的状态
        flow.children.forEach(function (ntr, index) {
            if (index < targetLevelOneIndex) {
                ntr.element.classList.add('played');
            } else {
                ntr.element.classList.remove('played');
            }
        });

        doCallback('jump');

        return targetNtr.element;
    };

    /**
     * 变换事件监听
     *
     * @param {Function} cb: 注册的监听函数
     */
    Slideshow.addListener = function (cb) {
        if (!cb || typeof cb !== 'function') {
            throw new TypeError('onchange listener must be a function')
        }

        callbacks.push(cb);
    };

    /**
     * 移除所有 onchange 监听
     */
    Slideshow.removeListener = function () {
        callbacks.length = 0;
    };

    // 监听 hashchange
    window.addEventListener('hashchange', function () {
        var indexChain = location.hash.slice(1),
            curIndexChain = flatFlow[currentIndex].indexChain;

        if (!indexChain || indexChain === curIndexChain) {
            return;
        }

        Slideshow.jumpTo(indexChain);
    });

    return Slideshow;
}(window.Slideshow || {});