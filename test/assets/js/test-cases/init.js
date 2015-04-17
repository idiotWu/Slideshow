/**
 * @date     2015/4/15
 * @author   Dolphin<dolphin.w.e@gmail.com>
 */

(function (Slideshow) {
    'use strict';

    var container = document.createElement('div');

    container.innerHTML = [
        '<div class="a"></div>',
        '<div class="a">',
        '    <div class="a">',
        '        <div class="a">',
        '            <div class="a" data-index-chain="1.0.0.0"></div>',
        '        </div>',
        '        <div class="a"></div>',
        '    </div>',
        '    <div class="a"></div>',
        '</div>',
        '<div class="a"></div>',
        '<div class="x"></div>',
        '<div class="x">',
        '    <div class="a">',
        '        <div class="a"></div>',
        '    </div>',
        '</div>',
        '<div class="x">',
        '    <div class="x">',
        '        <div class="x">',
        '            <div class="x">',
        '                <div class="a"></div>',
        '            </div>',
        '        </div>',
        '    </div>',
        '</div>'
    ].join('');

    var ntr = Slideshow.finder('a', container),
        originElems = container.querySelectorAll('.a'),
        markedElem = container.querySelector('[data-index-chain="1.0.0.0"]'),
        elemCount = originElems.length,
        NodeTree = ntr.constructor,
        every = Function.prototype.call.bind(Array.prototype.every),
        assert = chai.assert,
        expect = chai.expect;

    var removeHash = function() {
        history.pushState('', document.title, window.location.pathname);
    }
