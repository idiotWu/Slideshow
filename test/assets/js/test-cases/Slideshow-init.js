/**
 * @date     2015/4/15
 * @author   Dolphin<dolphin.w.e@gmail.com>
 *
 * Tests for Slideshow
 */

describe('Slideshow', function () {
    location.hash = ''; // reset

    describe('init', function () {
        it('next frame should be 1.0 according to location.hash', function () {
            location.hash = '1';
            var temp = Slideshow.init('a', container);

            Slideshow.next();
            expect(Slideshow.next()).to.equal(temp.getChild('1.0').element);
        });
    });