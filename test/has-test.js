import {expect} from 'chai';
import hf from '../src/index';

describe('Hf #has', () => {
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
      expect(hf.has(hfObj, {rel: 'next'})).to.be.true;
    });
  });

  context('when the given rel does not exists', () => {
    it('returns false', () => {
      expect(hf.has(hfObj, {rel: 'foobar'})).to.be.false;
    });
  });

  context('when given an Hf object', () => {
    it('returns the `next` links', () => {
      expect(hf.has(hfObj, {rel: 'next'})).to.be.true;
    });
  });

  context('when given a transitions array', () => {
    it('returns the `next` links', () => {
      expect(hf.has(hfObj.transitions, {rel: 'next'})).to.be.true;
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
      expect(hf.has(hfObjWithNumber, 1)).to.be.false;
    });
  });
});
