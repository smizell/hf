import {expect} from 'chai';
import hf from '../src/index';

describe('Hf #getBy', () => {
  context('when there are no matches', () => {
    const hfObj = {
      transitions: [],
    };

    it('returns undefined', () => {
      expect(hf.getBy(hfObj, {rel: 'next'})).to.be.undefined;
    });
  });

  context('when there is a link', () => {
    const hfObj = {
      transitions: [
        {
          tag: 'link',
          rel: 'next',
        },
      ],
    };

    it('returns the link object', () => {
      expect(hf.getBy(hfObj, {rel: 'next'})).to.deep.equal(hfObj.transitions[0]);
    });
  });

  context('when looking up an embed', () => {
    const hfObj = {
      transitions: [
        {
          tag: 'link',
          rel: 'next',
        },
        {
          tag: 'embed',
          rel: 'next',
          attributes: {
            foo: 'bar',
          },
        },
        {
          tag: 'embed',
          rel: 'next',
          attributes: {
            foo: 'baz',
          },
        },
      ],
    };

    it('returns the first embed object', () => {
      expect(hf.getBy(hfObj, {rel: 'next', tag: 'embed'})).to.deep.equal(hfObj.transitions[1]);
    });
  });

  context('when the object given is undefined', () => {
    it('returns undefined', () => {
      expect(hf.getBy(undefined, {rel: 'next', tag: 'embed'})).to.be.undefined;
    });
  });

  context('when the value given is not an object', () => {
    it('returns undefined', () => {
      expect(hf.getBy('foobar', {rel: 'next', tag: 'embed'})).to.be.undefined;
    });
  });

  context('when the value given is null', () => {
    it('returns undefined', () => {
      expect(hf.getBy(null, {rel: 'next', tag: 'embed'})).to.be.undefined;
    });
  });

  context('when the value given is an array', () => {
    const hfObj = {
      transitions: [
        {
          tag: 'link',
          rel: 'next',
        },
      ],
    };

    it('returns the link object', () => {
      expect(hf.getBy(hfObj.transitions, {rel: 'next'})).to.deep.equal(hfObj.transitions[0]);
    });
  });

  context('when the rel is not an object', () => {
    const hfObj = {
      transitions: [
        {
          tag: 'link',
          rel: 1,
        },
      ],
    };

    it('returns undefined', () => {
      expect(hf.getBy(hfObj, 1)).to.be.undefined;
    });
  });
});
