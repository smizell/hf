import {expect} from 'chai';
import hf from '../src/index';

describe('Hf #filterBy', () => {
  context('when given an matching condition', () => {
    const hfObj = {
      transitions: [
        {
          tag: 'link',
          rel: 'last',
          href: '/user/100',
        },
        {
          tag: 'link',
          rel: 'next',
          href: '/user/2',
        },
      ],
    };

    function testFilterByRel(transitions) {
      expect(transitions[0]).to.deep.equal(hfObj.transitions[1]);
      expect(transitions.length).to.equal(1);
    }

    context('when given an Hf object', () => {
      it('returns the `next` links', () => {
        testFilterByRel(hf.filterBy(hfObj, {rel: 'next'}));
      });
    });

    context('when given a transitions array', () => {
      it('returns the `next` links', () => {
        testFilterByRel(hf.filterBy(hfObj.transitions, {rel: 'next'}));
      });
    });
  });

  context('when given a condition that does not match', () => {
    const hfObj = {
      transitions: [
        {
          tag: 'link',
          rel: 'last',
          href: '/user/100',
        },
        {
          tag: 'link',
          rel: 'next',
          href: '/user/2',
        },
      ],
    };

    it('returns undefined', () => {
      const transitions = hf.filterBy(hfObj, {rel: 'foobar'});
      expect(transitions.length).to.equal(0);
    });
  });

  context('when given an existing tag', () => {
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
        },
        {
          tag: 'link',
          rel: 'next',
          href: '/user/2',
        },
      ],
    };

    function testFilterByTag(transitions) {
      expect(transitions).to.be.length(2);
      expect(transitions).to.deep.equal([hfObj.transitions[0], hfObj.transitions[2]]);
    }

    context('when given an Hf object', () => {
      it('returns each transition for that given tag', () => {
        testFilterByTag(hf.filterBy(hfObj, {tag: 'link'}));
      });
    });

    context('when given a transitions array', () => {
      it('returns each transition for that given tag', () => {
        testFilterByTag(hf.filterBy(hfObj.transitions, {tag: 'link'}));
      });
    });
  });

  context('when the object given is undefined', () => {
    it('returns each transition for that given tag', () => {
      expect(hf.filterBy(undefined, {rel: 'next'})).to.deep.equal([]);
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

    it('returns the correct results', () => {
      const results = hf.filterBy(hfObj, (transition) => hf.attributes(transition).foo === 'bar');
      expect(results).to.deep.equal([hfObj.transitions[1]]);
    });
  });

  context('when the value given is not an object', () => {
    it('returns each transition for that given tag', () => {
      expect(hf.filterBy('foobar', {rel: 'next'})).to.deep.equal([]);
    });
  });

  context('when the value given is null', () => {
    it('returns each transition for that given tag', () => {
      expect(hf.filterBy(null, {rel: 'next'})).to.deep.equal([]);
    });
  });

  context('when the conditions are not an object', () => {
    const hfObj = {
      transitions: [
        {
          tag: 'link',
          rel: 1,
        },
      ],
    };

    it('returns each transition for that given tag', () => {
      expect(hf.filterBy(hfObj, 1)).to.deep.equal([]);
    });
  });
});
