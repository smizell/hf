import {expect} from 'chai';
import hf from '../src/index';

describe('Hf #hasRel', () => {
  const hfObj = {
    transitions: [
      {
        tag: 'link',
        rel: 'next',
        href: '/user/2',
      },
    ],
  };

  context('when the given rel exists', () => {
    it('returns true', () => {
      expect(hf.hasRel(hfObj, 'next')).to.be.true;
    });
  });

  context('when the given rel does not exists', () => {
    it('returns false', () => {
      expect(hf.hasRel(hfObj, 'foobar')).to.be.false;
    });
  });

  context('when given an Hf object', () => {
    it('returns the `next` links', () => {
      expect(hf.hasRel(hfObj, 'next')).to.be.true;
    });
  });

  context('when given a transitions array', () => {
    it('returns the `next` links', () => {
      expect(hf.hasRel(hfObj.transitions, 'next')).to.be.true;
    });
  });

  context('when the rel is not a string', () => {
    const hfObjWithNumber = {
      transitions: [
        {
          tag: 'link',
          rel: 1,
        },
      ],
    };

    it('returns false', () => {
      expect(hf.hasRel(hfObjWithNumber, 1)).to.be.false;
    });
  });
});
