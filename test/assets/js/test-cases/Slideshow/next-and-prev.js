/**
 * @date     2015/4/15
 * @author   Dolphin<dolphin.w.e@gmail.com>
 *
 * Tests for Slideshow.next() & Slideshow.prev()
 */

describe('.next() & .prev()', function () {
    it('result should be the next/prev frame target', function () {
        removeHash();
        Slideshow.init('a', container);

        expect(Slideshow.next()).to.equal(originElems[1]);
        expect(Slideshow.prev()).to.equal(originElems[0]);
    });
});

