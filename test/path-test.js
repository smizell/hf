import {expect} from 'chai';
import hf from '../src/index';

describe('Hf #path', () => {
  context('when given a path that exists', () => {
    const hfObj = {
      attributes: {
        bar: 'foo',
        foo: [
          {
            bar: ['zero', 'one', 'two'],
          },
        ],
      },
    };

    it('returns them all', () => {
      expect(hf.path(hfObj, ['attributes', 'foo', 0, 'bar', 1])).to.equal('one');
    });
  });

  context('when given a path that does not exist', () => {
    context('when a default value is not given', () => {
      const hfObj = {};

      it('returns undefined', () => {
        expect(hf.path(hfObj, ['attributes', 'foo', 0, 'bar', 1])).to.be.undefined;
      });
    });

    context('when a default value is given', () => {
      context('when a non-null value is found', () => {
        const hfObj = {};
        const defaultValue = 'foobar';

        it('returns the default value', () => {
          expect(hf.path(hfObj, ['attributes', 'foo', 0, 'bar', 1], defaultValue)).to.equal(defaultValue);
        });
      });

      context('when a null is found', () => {
        const hfObj = {
          attributes: {
            foo: null,
          },
        };
        const defaultValue = 'foobar';

        it('returns the default value', () => {
          expect(hf.path(hfObj, ['attributes', 'foo'], defaultValue)).to.be.null;
        });
      });
    });
  });

  context('when the value given is not an object or array', () => {
    it('returns undefined', () => {
      expect(hf.path('foobar', ['foo', 'bar'])).to.be.undefined;
    });
  });

  context('when the value given is an array', () => {
    it('returns the correct value', () => {
      expect(hf.path([{ foo: 'bar'}], [0, 'foo'])).to.equal('bar');
    });
  });

  context('when the value given is null', () => {
    it('returns undefined', () => {
      expect(hf.path(null, ['foo', 'bar'])).to.be.undefined;
    });
  });

  context('when the steps given is null', () => {
    const hfObj = {};

    it('returns each transition for that given tag', () => {
      expect(hf.path(hfObj, null)).to.be.undefined;
    });
  });
});
