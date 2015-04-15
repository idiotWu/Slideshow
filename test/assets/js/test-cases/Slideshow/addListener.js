/**
 * @date     2015/4/15
 * @author   Dolphin<dolphin.w.e@gmail.com>
 *
 * Tests for Slideshow#addListener
 */

describe('.addListener', function () {
    Slideshow.init('a', container);

    it('change type should be "next"', function () {
        var promise = new Promise(Slideshow.addListener);

        Slideshow.next();
        expect(promise).to.eventually.equal('next');
    });

    it('change type should be "prev"', function () {
        var promise = new Promise(Slideshow.addListener);

        Slideshow.prev();
        expect(promise).to.eventually.equal('prev');
    });

    it('change type should be "jump"', function () {
        var promise = new Promise(Slideshow.addListener);

        Slideshow.jumpTo(3);
        expect(promise).to.eventually.equal('jump');
    });
});
