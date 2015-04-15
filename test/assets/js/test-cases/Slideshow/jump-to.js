/**
 * @date     2015/4/15
 * @author   Dolphin<dolphin.w.e@gmail.com>
 *
 * Tests for Slideshow.jumpTo()
 */

describe('.jumpTo()', function () {
    var temp = Slideshow.init('a', container);

    it('should throw error when indexChain is illegal', function () {
        expect(Slideshow.jumpTo).to.throw;
        expect(Slideshow.jumpTo.bind(ntr, 'wrong')).to.throw;
    });

    it('should jump to frame "1.0.0.0"', function () {
        Slideshow.jumpTo('1.0.0.0');

        var promise = new Promise(function (resolve) {
           Slideshow.addListener(function (type, elem) {
               resolve(elem);
           });
        });

        expect(promise).to.eventually.equal(container.querySelector('[data-index-chain="1.0.0.0"]'));
    });
});

