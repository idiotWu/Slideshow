/**
 * @date     2015/4/15
 * @author   Dolphin<dolphin.w.e@gmail.com>
 *
 * Tests for NodeTree#toHTML
 */

describe('#toHTML', function () {
    var html = ntr.toHTML(),
        container = document.createElement('div');

    container.innerHTML = html;

    it('result should be a HTML String', function () {
        expect(html).to.be.a('string');
        expect(container.innerHTML).to.equal(html);
    });
});