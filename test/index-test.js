import {expect} from 'chai';

import hf from '../src/index.js';

describe('Hf', () => {
  describe('#getByRel', () => {
    context('when there are no matches', () => {
      const hfObj = {
        transitions: [],
      };

      it('returns undefined', () => {
        expect(hf.getByRel(hfObj, 'next')).to.be.undefined;
      });
    });

    context('when there is a link', () => {
      const hfObj = {
        transitions: [
          {
            tag: 'link',
            rels: ['next'],
          },
        ],
      };

      it('returns the link object', () => {
        expect(hf.getByRel(hfObj, 'next')).to.deep.equal(hfObj.transitions[0]);
      });
    });

    context('when there is an embed', () => {
      const hfObj = {
        transitions: [
          {
            tag: 'embed',
            rels: ['next'],
          },
        ],
      };

      it('returns the embed object', () => {
        expect(hf.getByRel(hfObj, 'next')).to.deep.equal(hfObj.transitions[0]);
      });
    });

    context('when there is a link and embed', () => {
      const hfObj = {
        transitions: [
          {
            tag: 'link',
            rels: ['next'],
            href: '/user/1',
          },
          {
            tag: 'embed',
            rels: ['next'],
            href: '/user/2',
          },
          {
            tag: 'embed',
            rels: ['last'],
            href: '/user/10',
          },
        ],
      };

      it('returns the embed object', () => {
        expect(hf.getByRel(hfObj, 'next')).to.deep.equal(hfObj.transitions[1]);
      });
    });

    context('when the object given is undefined', () => {
      it('returns each transition for that given tag', () => {
        expect(hf.getByRel(undefined, 'next')).to.be.undefined;
      });
    });

    context('when the value given is not an object', () => {
      it('returns each transition for that given tag', () => {
        expect(hf.getByRel('foobar', 'next')).to.be.undefined;
      });
    });

    context('when the value given is null', () => {
      it('returns each transition for that given tag', () => {
        expect(hf.getByRel(null, 'next')).to.be.undefined;
      });
    });
  });

  describe('#filterByRel', () => {
    context('when given an existing rel', () => {
      const hfObj = {
        transitions: [
          {
            tag: 'link',
            rels: ['last'],
            href: '/user/100',
          },
          {
            tag: 'link',
            rels: ['next'],
            href: '/user/2',
          },
        ],
      };

      it('returns undefined', () => {
        const transitions = hf.filterByRel(hfObj, 'next');
        expect(transitions[0]).to.deep.equal(hfObj.transitions[1]);
        expect(transitions.length).to.equal(1);
      });
    });

    context('when given rel that does not exist', () => {
      const hfObj = {
        transitions: [
          {
            tag: 'link',
            rels: ['last'],
            href: '/user/100',
          },
          {
            tag: 'link',
            rels: ['next'],
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
  });

  describe('#filterByTag', () => {
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

      it('returns each transition for that given tag', () => {
        expect(hf.filterByTag(hfObj, 'link')).to.be.length(2);
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
  });

  describe('#attributes', () => {
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

  describe('#transitions', () => {
    context('when there are transitions', () => {
      const hfObj = {
        transitions: [
          {
            tag: 'link',
            rels: ['next'],
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

  describe('#path', () => {
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
      const hfObj = {};

      it('returns undefined', () => {
        expect(hf.path(hfObj, ['attributes', 'foo', 0, 'bar', 1])).to.be.undefined;
      });
    });

    context('when the value given is not an object', () => {
      it('returns undefined', () => {
        expect(hf.path('foobar', ['foo', 'bar'])).to.be.undefined;
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
});
