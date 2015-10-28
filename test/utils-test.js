import {expect} from 'chai';
import _ from '../src/utils';

describe('Hf Utils', () => {
  describe('#isObjectLiteral', () => {
    context('when given an object literal', () => {
      it('returns true', () => {
        expect(_.isObject({})).to.be.true;
      });
    });

    context('when given an array', () => {
      it('returns false', () => {
        expect(_.isObject([])).to.be.false;
      });
    });
  });
});
