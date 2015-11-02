import {expect} from 'chai';
import hf from '../src/index';

describe('Hf #getBy', () => {
  context('when there are no matches', () => {
    const hfObj = {
      transitions: [],
    };

    it('returns undefined', () => {
      expect(hf.find(hfObj, {rel: 'next'})).to.be.undefined;
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
      expect(hf.find(hfObj, {rel: 'next'})).to.deep.equal(hfObj.transitions[0]);
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
      expect(hf.find(hfObj, {rel: 'next', tag: 'embed'})).to.deep.equal(hfObj.transitions[1]);
    });
  });

  context('when the object given is undefined', () => {
    it('returns undefined', () => {
      expect(hf.find(undefined, {rel: 'next', tag: 'embed'})).to.be.undefined;
    });
  });

  context('when the value given is a function', () => {
    const hfObj = {
      transitions: [
        {
          tag: 'link',
          rel: 'last',
          href: '/user/100',
        },
        {
          tag: 'embed',
          rel: 'next',
          href: '/user/2',
          attributes: {
            foo: 'bar',
          },
        },
        {
          tag: 'link',
          rel: 'next',
          href: '/user/2',
        },
      ],
    };

    it('returns the correct result', () => {
      const result = hf.find(hfObj, (transition) => hf.attributes(transition).foo === 'bar');
      expect(result).to.deep.equal(hfObj.transitions[1]);
    });
  });

  context('when the value given is not an object', () => {
    it('returns undefined', () => {
      expect(hf.find('foobar', {rel: 'next', tag: 'embed'})).to.be.undefined;
    });
  });

  context('when the value given is null', () => {
    it('returns undefined', () => {
      expect(hf.find(null, {rel: 'next', tag: 'embed'})).to.be.undefined;
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
      expect(hf.find(hfObj.transitions, {rel: 'next'})).to.deep.equal(hfObj.transitions[0]);
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
      expect(hf.find(hfObj, 1)).to.be.undefined;
    });
  });
});
