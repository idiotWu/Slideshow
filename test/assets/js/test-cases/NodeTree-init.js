/**
 * @date     2015/4/15
 * @author   Dolphin<dolphin.w.e@gmail.com>
 *
 * Tests for NodeTree
 */

describe('NodeTree', function () {
    describe('init NodeTree', function () {
        var newNtr = new NodeTree();

        it('this should be the root NTR', function () {
            expect(newNtr.element).to.equal('root');
            expect(newNtr.depth).to.equal(0);
            expect(newNtr.children.length).to.equal(0);
            expect(newNtr.parent).to.be.undefined;
        });

        it('the last element of target should be depth 1', function () {
            var last = ntr.children[ntr.children.length - 1];
            expect(last.element).to.equal(originElems[originElems.length - 1]);
            expect(last.depth).to.equal(1);
        });
    });