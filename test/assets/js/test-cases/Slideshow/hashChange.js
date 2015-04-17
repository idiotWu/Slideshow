/**
 * @date     2015/4/17
 * @author   Dolphin<dolphin.w.e@gmail.com>
 *
 * Tests for hashChange event handler
 */

describe('hashChange handler', function () {
    it('event type should be "jump" and should jump to frame "1.0.0.0"', function () {
        Slideshow.init('a', container);
        location.hash = '1.0.0.0';
        history.back();

        var promise = new Promise(function (resolve) {
            Slideshow.addListener(function (type, elem) {
                resolve(elem);
            });
        });

        history.forward();

        expect(new Promise(Slideshow.addListener)).to.eventually.equal('jump');
        expect(promise).to.eventually.equal(markedElem);
    });
});