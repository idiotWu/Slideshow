/**
 * @date     2015/4/15
 * @author   Dolphin<dolphin.w.e@gmail.com>
 *
 * Tests for NodeTree#toTitleList
 */

describe('#toTitleList', function () {
    var listBasic = ntr.toTitleList();

    it('result should be an ordered list', function () {
        expect(listBasic.tagName).to.equal('OL');
    });

    it('all children shouldn\'t have class name', function () {
        var hasClass = every(listBasic.querySelectorAll('li'), function (elem) {
            return elem.className;
        });

        expect(hasClass).to.be.false;
    });

    it('attribute "data-index" of list item should be increased in order', function () {
        var isInOrder = every(listBasic.querySelectorAll('li'), function (elem, index) {
            return index === parseInt(elem.getAttribute('data-index'));
        });

        expect(isInOrder).to.be.true;
    });

    var listWithClassName = ntr.toTitleList('test-class');

    it('all children should be created with class name "test-class"', function () {
        var isRightClass = every(listWithClassName.querySelectorAll('li'), function (elem, index) {
            return elem.className === 'test-class';
        });

        expect(isRightClass).to.be.true;
    });

    var childNtr = ntr.children[0],
        listIncludeSelf = childNtr.toTitleList(undefined, true);

    it('first item of this should be the NTR itself', function () {
        var indexChain = listIncludeSelf.children[0].getAttribute('data-index-chain');
        expect(indexChain).to.equal(childNtr.indexChain);
    });

    it('and it is the only list item', function () {
        expect(listIncludeSelf.children[0].children.length).to.equal(0);
    });
});