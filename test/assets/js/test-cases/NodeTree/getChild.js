/**
 * @date     2015/4/15
 * @author   Dolphin<dolphin.w.e@gmail.com>
 *
 * Tests for NodeTree#getChild
 */

describe('#getChild', function () {
    it('should throw error when indexChain is illegal', function () {
        expect(ntr.getChild).to.throw;
        expect(ntr.getChild.bind(ntr, 'wrong')).to.throw;
    });

    it('should return null for unexisted item', function () {
        expect(ntr.getChild('1000.0.0')).to.be.null;
    });

    it('should return the right item', function () {
        var result = ntr.getChild('1.0.0.0');
        expect(result.indexChain).to.equal('1.0.0.0');
        expect(result.element).to.equal(container.querySelector('[data-index-chain="1.0.0.0"]'));
    });
});