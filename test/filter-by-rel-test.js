import {expect} from 'chai';
import hf from '../src/index';

describe('Hf #filterByRel', () => {
  context('when given an existing rel', () => {
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
        testFilterByRel(hf.filterByRel(hfObj, 'next'));
      });
    });

    context('when given a transitions array', () => {
      it('returns the `next` links', () => {
        testFilterByRel(hf.filterByRel(hfObj.transitions, 'next'));
      });
    });
  });

  context('when given rel that does not exist', () => {
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
      const transitions = hf.filterByRel(hfObj, 'foobar');
      expect(transitions.length).to.equal(0);
    });
  });

  context('when the object given is undefined', () => {
    it('returns each transition for that given tag', () => {
      expect(hf.filterByRel(undefined, 'next')).to.deep.equal([]);
    });
  });

  context('when the value given is not an object', () => {
    it('returns each transition for that given tag', () => {
      expect(hf.filterByRel('foobar', 'next')).to.deep.equal([]);
    });
  });

  context('when the value given is null', () => {
    it('returns each transition for that given tag', () => {
      expect(hf.filterByRel(null, 'next')).to.deep.equal([]);
    });
  });

  context('when the rel is not a string', () => {
    const hfObj = {
      transitions: [
        {
          tag: 'link',
          rel: 1,
        },
      ],
    };

    it('returns each transition for that given tag', () => {
      expect(hf.filterByRel(hfObj, 1)).to.deep.equal([]);
    });
  });
});
