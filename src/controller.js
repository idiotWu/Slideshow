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
     * @param {String} indexList: 递推式索引，同 ntr.getChild
     * @param {Boolean} isRemoveClass: 为 true 时移除 class 'show'，否则添加 class 'show'
     */
    var toggleUntil = function (indexList, isRemoveClass) {
        var indexArr = indexList.split('.'),
            target = flow.getChild(indexArr[0]);

        if (!target) {
            return;
        }

        var ntrList = target.flatten(true),
            length = ntrList.length - 1;

        ntrList.some(function (ntr, index) {
            var elem = ntr.element,
                curIndexChain = ntr.indexChain;

            if (isRemoveClass) {
                elem.classList.remove('show');
                elem.classList.remove('played');
            } else {
                elem.classList.add('show');

                if (ntr.depth === 1 || index === length) {
                    elem.classList.remove('played');
                } else {
                    elem.classList.add('played');
                }
            }

            return curIndexChain === indexList;
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
                } catch(e) {};
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
            curNtr.element.classList.add('played');
        }

        if (nextNtr.depth === 1) {
            var prevNtr = flow.getChild(--nextIndexChain),
                prevElem = prevNtr.element;

            prevElem.classList.remove('show');
            prevElem.classList.add('played');
        }

        currentIndex++;

        nextElem.classList.add('show');

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
            asap(function () {
                toggleUntil(prevNtr.indexChain, false);
            });
        }

        curNtr.element.classList.remove('show');
        prevElem.classList.remove('played');

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
        var levelOneIndex = parseInt(indexChain.split('.')[0], 10);

        asap(function () {
            toggleUntil(curIndexChain, true);
        });

        asap(function () {
            toggleUntil(indexChain, false);
        });

        asap(function () {
            flow.children.forEach(function (ntr, index) {
                if (index < levelOneIndex) {
                    ntr.element.classList.add('played');
                } else {
                    ntr.element.classList.remove('played');
                }
            });
        })

        doCallback('jump');
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

    return Slideshow;
}(window.Slideshow || {});