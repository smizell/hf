import {expect} from 'chai';
import hf from '../src/index';

describe('Hf #transitions', () => {
  context('when there are transitions', () => {
    const hfObj = {
      transitions: [
        {
          tag: 'link',
          rel: 'next',
        },
      ],
    };

    it('returns them all', () => {
      expect(hf.transitions(hfObj)).to.deep.equal(hfObj.transitions);
    });
  });

  context('when there are no transitions', () => {
    const hfObj = {};

    it('returns an empty array', () => {
      expect(hf.transitions(hfObj)).to.deep.equal([]);
    });
  });

  context('when the value given is not an object', () => {
    it('returns each transition for that given tag', () => {
      expect(hf.transitions('foobar')).to.deep.equal([]);
    });
  });

  context('when the value given is null', () => {
    it('returns each transition for that given tag', () => {
      expect(hf.transitions(null)).to.deep.equal([]);
    });
  });
});
