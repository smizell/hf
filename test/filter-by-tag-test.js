import {expect} from 'chai';
import hf from '../src/index';

describe('Hf #filterByTag', () => {
  context('when given an existing tag', () => {
    const hfObj = {
      transitions: [
        {
          tag: 'link',
          rels: ['last'],
          href: '/user/100',
        },
        {
          tag: 'embed',
          rels: ['next'],
          href: '/user/2',
        },
        {
          tag: 'link',
          rels: ['next'],
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
        testFilterByTag(hf.filterByTag(hfObj, 'link'));
      });
    });

    context('when given a transitions array', () => {
      it('returns each transition for that given tag', () => {
        testFilterByTag(hf.filterByTag(hfObj.transitions, 'link'));
      });
    });
  });

  context('when the object given is undefined', () => {
    it('returns each transition for that given tag', () => {
      expect(hf.filterByTag(undefined, 'link')).to.deep.equal([]);
    });
  });

  context('when the value given is not an object', () => {
    it('returns each transition for that given tag', () => {
      expect(hf.filterByTag('foobar', 'link')).to.deep.equal([]);
    });
  });

  context('when the value given is null', () => {
    it('returns each transition for that given tag', () => {
      expect(hf.filterByTag(null, 'link')).to.deep.equal([]);
    });
  });

  context('when the rel is not a string', () => {
    const hfObj = {
      transitions: [
        {
          tag: 1,
        },
      ],
    };

    it('returns each transition for that given tag', () => {
      expect(hf.filterByTag(hfObj, 1)).to.deep.equal([]);
    });
  });
});
