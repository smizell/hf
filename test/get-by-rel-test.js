import {expect} from 'chai';
import hf from '../src/index';

describe('Hf #getByRel', () => {
  context('when there are no matches', () => {
    const hfObj = {
      transitions: [],
    };

    it('returns undefined', () => {
      expect(hf.getByRel(hfObj, 'next')).to.be.undefined;
    });
  });

  context('when there is a link', () => {
    const hfObj = {
      transitions: [
        {
          tag: 'link',
          rels: ['next'],
        },
      ],
    };

    it('returns the link object', () => {
      expect(hf.getByRel(hfObj, 'next')).to.deep.equal(hfObj.transitions[0]);
    });
  });

  context('when there is an embed', () => {
    const hfObj = {
      transitions: [
        {
          tag: 'embed',
          rels: ['next'],
        },
      ],
    };

    it('returns the embed object', () => {
      expect(hf.getByRel(hfObj, 'next')).to.deep.equal(hfObj.transitions[0]);
    });
  });

  context('when there is a link and embed', () => {
    const hfObj = {
      transitions: [
        {
          tag: 'link',
          rels: ['next'],
          href: '/user/1',
        },
        {
          tag: 'embed',
          rels: ['next'],
          href: '/user/2',
        },
        {
          tag: 'embed',
          rels: ['last'],
          href: '/user/10',
        },
      ],
    };

    it('returns the embed object', () => {
      expect(hf.getByRel(hfObj, 'next')).to.deep.equal(hfObj.transitions[1]);
    });
  });

  context('when the object given is undefined', () => {
    it('returns undefined', () => {
      expect(hf.getByRel(undefined, 'next')).to.be.undefined;
    });
  });

  context('when the value given is not an object', () => {
    it('returns undefined', () => {
      expect(hf.getByRel('foobar', 'next')).to.be.undefined;
    });
  });

  context('when the value given is null', () => {
    it('returns undefined', () => {
      expect(hf.getByRel(null, 'next')).to.be.undefined;
    });
  });

  context('when the rel is not a string', () => {
    const hfObj = {
      transitions: [
        {
          tag: 'link',
          rels: [1],
        },
      ],
    };

    it('returns each transition for that given tag', () => {
      expect(hf.getByRel(hfObj, 1)).to.be.undefined;
    });
  });
});
