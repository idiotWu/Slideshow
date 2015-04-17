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
        Slideshow.jumpTo('1.0.0.0');

        var promise = new Promise(function (resolve) {
           Slideshow.addListener(function (type, elem) {
               resolve(elem);
           });
        });

        expect(promise).to.eventually.equal(markedElem);
    });

    it('targets should be classed with right name', function () {
        location.hash = '';
        var temp = Slideshow.init('a', container);

        Slideshow.jumpTo('1.0.0');

        var promise = new Promise(Slideshow.addListener);

        var checkClass = function () {
            return temp.getChild(1)
                .flatten(true)
                .filter(function (ntr, index) {
                    var chainValue = ntr.indexChain.split('.').join(''),
                        className = ntr.element.className;

                    if (!index || chainValue === 100) {
                        return className.match(/(a|show)/g).length === 2;
                    }
                    if (chainValue < 100) {
                        return className.match(/(a|show|played)/g).length === 2;
                    }

                    return className === 'a';
                });
        };

        expect(promise.then(checkClass)).eventually.to.be.true;
    });
});

