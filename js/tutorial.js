/**
 * @date     2015/4/13
 * @author   Dolphin<dolphin.w.e@gmail.com>
 */

(function (Slideshow) {
    'use strict';

    var timeLine = Slideshow.init('timeline'),
        nextBtn = document.querySelector('.next'),
        prevBtn = document.querySelector('.prev'),
        progressLine = document.querySelector('#progress .line'),
        nav = document.getElementById('slide-nav'),
        main = document.getElementById('slideshow'),
        keyMap = {
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down'
        };

    var previewList = timeLine.toTitleList('preview'),
        flattenList = Slideshow.finder('preview', previewList).flatten(),
        length = flattenList.length - 1;

    previewList.id = 'preview-list';
    nav.appendChild(previewList);

    var currentElem = flattenList[0].element;

    currentElem.classList.add('cur');

    Slideshow.addListener(function (type, element, progress) {
        var currentNtr = this,
            curIndex = currentNtr.index,
            elem = flattenList[curIndex].element;

        elem.classList.add('cur');

        currentElem && currentElem.classList.remove('cur');
        currentElem = elem;

        progressLine.style.width = progress * 100 + '%';

        if (!curIndex) {
            prevBtn.classList.add('disable');
        } else if (curIndex === length) {
            nextBtn.classList.add('disable');
        }

        if (curIndex > 0) {
            prevBtn.classList.remove('disable');
        }

        if (curIndex < length) {
            nextBtn.classList.remove('disable');
        }
    });

    var getRandomColor = function () {
        var colorSet = [];
        for (var i = 0; i < 3; i++) {
            colorSet.push(Math.random() * 255 | 0);
        }

        return 'rgb(' + colorSet.join(',') + ')';
    };

    Array.prototype.forEach.call(document.querySelectorAll('.effect'), function (elem) {
        elem.style.left = Math.random() * 80 + '%';
        elem.style.top = Math.random() * 80 + '%';
        elem.style.color = getRandomColor();
        elem.style.fontSize = Math.random() + 0.5 + 'rem';
    });

    document.getElementById('open-nav')
        .addEventListener('click', function () {
            var isOpen = main.classList.contains('open');

            if (isOpen) {
                main.classList.remove('open');
            } else {
                main.classList.add('open');
            }
        });

    previewList.addEventListener('click', function (e) {
        var indexChain = e.target.getAttribute('data-index-chain');

        if (indexChain) {
            Slideshow.jumpTo(indexChain);
        }
    });

    document.getElementById('control')
        .addEventListener('click', function (e) {
            var type = e.target.className.match(/(prev|next)/);

            if (type) {
                Slideshow[type[0]]();
            }
        });

    document.addEventListener('keydown', function (e) {
        switch (keyMap[e.keyCode]) {
            case 'left':
            case 'up':
                e.preventDefault();
                return Slideshow.prev();
            case 'right':
            case 'down':
                e.preventDefault();
                return Slideshow.next();
        }
    });

})(window.Slideshow);