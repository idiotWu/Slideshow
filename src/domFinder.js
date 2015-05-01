/**
 * @date     2015/4/11
 * @author   Dolphin<dolphin.w.e@gmail.com>
 *
 * DOM 特定节点查找，并按照文档顺序建立节点树
 */

var Slideshow = function (Slideshow) {
    'use strict';

    /**
     * @constructor
     * 构造节点树
     *
     * @param {Element} [element]: 当前元素节点
     * @param {NodeTree} [parentNtr]: 父元素节点
     * @param {Number} [depth]: 节点深度
     */
    var NodeTree = function (element, parentNtr, depth) {
        this.element = element || 'root';
        this.depth = depth || 0;
        this.parent = parentNtr;
        this.children = [];

        if (parentNtr) {
            this.indexChain = (parentNtr.indexChain ? parentNtr.indexChain + '.' : '') + parentNtr.children.length;
        } else {
            this.indexChain = undefined;
        }

        return this;
    };

    /**
     * 按文档顺序将 NodeTree 所有元素封入 section 元素
     *
     * @return {Element}: 对所有元素的深拷贝封装
     */
    NodeTree.prototype.wrap = function () {
        var wrap = document.createElement('section');

        if (this.depth) {
            // 跳过根元素
            var target = this.element.cloneNode(true);
            wrap.appendChild(target);
            return wrap;
        }

        this.children.forEach(function (ntr) {
            var elem = ntr.element.cloneNode(true);
            wrap.appendChild(elem);
        });

        return wrap;
    };

    /**
     * 得到 NodeTree 的 HTML 文本
     *
     * @return {String}
     */
    NodeTree.prototype.toHTML = function () {
        return this.wrap().innerHTML;
    };

    /**
     * 把 NodeTree 转换为有序列表
     *
     * @param {String} className: 指定的 class name
     * @param {Boolean} includeSelf: 当不对根元素操作时，为 true 使返回列表第一级为自身
     *
     * @return {Element | Null} 结果列表
     */
    NodeTree.prototype.toTitleList = function (className, includeSelf) {
        var hasChild = this.children.length;

        if (!hasChild && !includeSelf) {
            return null;
        }

        var appendItem = function (list, ntr) {
            var item = document.createElement('li');
            item.textContent = ntr.element.getAttribute('data-title');
            item.setAttribute('data-index-chain', ntr.indexChain);
            item.setAttribute('data-index', ntr.index);
            list.appendChild(item);

            if (className) {
                item.className = className;
            }

            return item;
        };

        var listWrap = document.createElement('ol');

        var target;

        if (includeSelf && this.depth) {
            var listItem = appendItem(listWrap, this);

            if (hasChild) {
                target = document.createElement('ol');
                listItem.appendChild(target);
            }
        }

        target = target || listWrap;

        this.children.forEach(function (ntr) {
            var item = appendItem(target, ntr);

            if (ntr.children.length) {
                var next = ntr.toTitleList(className, false);
                if (next) {
                    item.appendChild(next);
                }
            }
        });

        return listWrap;
    };

    /**
     * 返回一维化的 NodeTree
     * 看我的降维攻击 (๑•̀ㅂ•́)✧
     *
     * @param {Boolean} [includeSelf]: 为 true 时数组首元素为自身
     * @param {Array} [ret]: 需要扩充的数组
     *
     * @return {Array} 被拍平的 NodeTree
     */
    NodeTree.prototype.flatten = function (includeSelf, ret) {
        ret = ret || [];

        if (includeSelf) {
            ret.push(this);
        }

        this.children.forEach(function (ntr) {
            ret.push(ntr);

            if (ntr.children.length) {
                ntr.flatten(false, ret);
            }
        });

        return ret;
    };

    /**
     * 根据递推式索引返回对应的节点
     *
     * @param {String | Number} indexChain: 递推式索引，如 '1.2.3' -> ntr.children[1].children[2].children[3]
     *
     * @return {NodeTree | Null}
     */
    NodeTree.prototype.getChild = function (indexChain) {
        if (!indexChain && indexChain !== 0) {
            throw new TypeError('missing argument indexList');
        }

        indexChain = indexChain.toString();

        if (!indexChain.match(/^(?:\d\.?)*\d$/)) {
            throw new TypeError('unrecognized indexList format, require ^(\\d\\.?)*\\d$');
        }

        var orders = indexChain.split('.'),
            len = orders.length - 1;

        var ret;

        try {
            ret = orders.reduce(function (prev, cur, i) {
                return i === len ? prev[cur] : prev[cur].children;
            }, this.children);
        } catch (e) {
            return null;
        }

        return ret;
    };

    /**
     * DOM 查找器
     *
     * @param {String} className: 目标元素的 class
     * @param {Element} [startContainer]: 查找起始父节点，默认为 body
     *
     * @return {NodeTree}
     */
    Slideshow.finder = function (className, startContainer) {
        startContainer = startContainer || document.body;

        if (!className) {
            throw new TypeError('missing argument className');
        }
        if (startContainer.nodeType !== 1) {
            throw new TypeError('start container must be an element');
        }

        var ntr = new NodeTree(),
            count = 0;

        ntr.index = 'root';

        return (function iterator(parentElem, parentNtr) {

            Array.prototype.forEach.call(parentElem.children, function (elem) {
                if (elem.classList.contains(className)) {
                    var next = new NodeTree(elem, parentNtr, parentNtr.depth + 1);
                    next.index = count++;
                    parentNtr.children.push(next);
                    return iterator(elem, next);
                }

                if (elem.childElementCount) {
                    iterator(elem, parentNtr);
                }
            });

            return parentNtr;

        })(startContainer, ntr);;
    };

    return Slideshow;
}(window.Slideshow || {});
