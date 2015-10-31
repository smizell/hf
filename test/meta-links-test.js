import {expect} from 'chai';
import hf from '../src/index';

describe('Hf #metaLinks', () => {
  context('when there are links', () => {
    const hfObj = {
      meta: {
        links: [
          {
            tag: 'link',
            rel: 'next',
          },
        ],
      },
    };

    it('returns them all', () => {
      expect(hf.metaLinks(hfObj)).to.deep.equal(hfObj.meta.links);
    });
  });

  context('when there are no links', () => {
    [{}, {meta: {}}].forEach(hfObj => {
      it('returns an empty array', () => {
        expect(hf.metaLinks(hfObj)).to.deep.equal([]);
      });
    });
  });

  context('when the value given is not an object', () => {
    it('returns an empty array', () => {
      expect(hf.metaLinks('foobar')).to.deep.equal([]);
    });
  });

  context('when the value given is null', () => {
    it('returns an empty array', () => {
      expect(hf.metaLinks(null)).to.deep.equal([]);
    });
  });
});
