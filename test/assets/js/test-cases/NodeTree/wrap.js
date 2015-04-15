/**
 * @date     2015/4/15
 * @author   Dolphin<dolphin.w.e@gmail.com>
 *
 * Tests for NodeTree#toHTML
 *
 */
describe('#wrap', function () {
    var wrap = ntr.wrap(),
        elements = wrap.querySelectorAll('.a');

    var wrappedAll = every(originElems, function (elem, index) {
        return elem.className === elements[index].className;
    });

    it('all children should be wrapped with <section>', function () {
        expect(wrap.tagName).to.equal('SECTION');
        expect(elements.length).to.equal(elemCount);
        expect(wrappedAll).to.equal(true);
    });
});