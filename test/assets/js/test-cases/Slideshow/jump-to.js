/**
 * @date     2015/4/15
 * @author   Dolphin<dolphin.w.e@gmail.com>
 *
 * Tests for Slideshow.jumpTo()
 */

describe('.jumpTo()', function () {
    it('should throw error when indexChain is illegal', function () {
        expect(Slideshow.jumpTo).to.throw(TypeError);
        expect(Slideshow.jumpTo.bind(ntr, 'wrong')).to.throw(TypeError);
    });

    it('should jump to frame "1.0.0.0"', function () {
        location.hash = '';
        Slideshow.init('a', container);

        expect(Slideshow.jumpTo('1.0.0.0')).to.equal(markedElem);
    });

    it('targets should be classed with right name', function () {
        location.hash = '';
        var temp = Slideshow.init('a', container),
            target = temp.getChild('1.0.0'),
            targetIndex = target.index;

        Slideshow.jumpTo('1.0.0');

        var isRightClass = every(temp.getChild(1).flatten(true), function (ntr, index) {
            var ntrIndex = ntr.index,
                className = ntr.element.className;

            if (!index || ntrIndex === targetIndex) {
                return className.match(/(a|show)/g).length === 2;
            }
            if (ntrIndex < targetIndex) {
                return className.match(/(a|show|played)/g).length === 3;
            }

            return className === 'a';
        });

        expect(isRightClass).to.be.true;
    });
});

