/**
 * @date     2015/4/15
 * @author   Dolphin<dolphin.w.e@gmail.com>
 *
 * Tests for Slideshow#removeListener
 */

describe('.removeListener', function () {
    it('result should be 2', function () {
        var promise = new Promise(function (resolve) {
            Slideshow.addListener(function () {
                resolve(1);
            });

            Slideshow.removeListener();

            Slideshow.addListener(function () {
                resolve(2);
            });
        });

        Slideshow.next();
        expect(promise).to.eventually.equal(2);
    });
});
