import {expect} from 'chai';
import hf from '../src/index';

describe('Hf #metaAttributes', () => {
  context('when given an object with attributes', () => {
    const hfObj = {
      meta: {
        attributes: {
          foo: 'bar',
        },
      },
    };

    it('returns the attributes', () => {
      expect(hf.metaAttributes(hfObj)).to.deep.equal(hfObj.meta.attributes);
    });
  });

  context('when given an object without meta attributes', () => {
    const hfObj = {};

    it('returns an empty object', () => {
      expect(hf.metaAttributes(hfObj)).to.deep.equal({});
    });
  });

  context('when the object given is undefined', () => {
    it('returns an empty object', () => {
      expect(hf.metaAttributes(undefined)).to.deep.equal({});
    });
  });

  context('when the value given is not an object', () => {
    it('returns an empty object', () => {
      expect(hf.metaAttributes('foobar')).to.deep.equal({});
    });
  });

  context('when the value given is null', () => {
    it('returns an empty object', () => {
      expect(hf.metaAttributes(null)).to.deep.equal({});
    });
  });
});
