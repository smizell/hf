import {expect} from 'chai';
import hf from '../src/index';

describe('Hf #attributes', () => {
  context('when given an object with attributes', () => {
    const hfObj = {
      attributes: {
        foo: 'bar',
      },
    };

    it('returns each transition for that given tag', () => {
      expect(hf.attributes(hfObj)).to.deep.equal(hfObj.attributes);
    });
  });

  context('when given an object without attributes', () => {
    const hfObj = {};

    it('returns each transition for that given tag', () => {
      expect(hf.attributes(hfObj)).to.deep.equal({});
    });
  });

  context('when the object given is undefined', () => {
    it('returns each transition for that given tag', () => {
      expect(hf.attributes(undefined)).to.deep.equal({});
    });
  });

  context('when the value given is not an object', () => {
    it('returns each transition for that given tag', () => {
      expect(hf.attributes('foobar')).to.deep.equal({});
    });
  });

  context('when the value given is null', () => {
    it('returns each transition for that given tag', () => {
      expect(hf.attributes(null)).to.deep.equal({});
    });
  });
});
