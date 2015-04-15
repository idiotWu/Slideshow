/**
 * @date     2015/4/15
 * @author   Dolphin<dolphin.w.e@gmail.com>
 *
 * Tests for NodeTree#toTitleList
 */

describe('#flatten', function () {
    var flatten = ntr.flatten();

    it('all children should be append in order', function () {
        var isInOrder = every(originElems, function (elem, index) {
            return flatten[index].index === index;
        });

        expect(isInOrder).to.be.true;
    })
});