/**
 * @date     2015/4/15
 * @author   Dolphin<dolphin.w.e@gmail.com>
 */

(function (Slideshow) {
    'use strict';

    var container = document.createElement('div');

    var tmpl = [
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

    container.innerHTML = tmpl;

    var ntr = Slideshow.finder('a', container),
        originElems = container.querySelectorAll('.a'),
        elemCount = originElems.length,
        NodeTree = ntr.constructor,
        every = Function.prototype.call.bind(Array.prototype.every);
