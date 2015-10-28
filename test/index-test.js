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

      it('returns an empty array', () => {
        expect(hf.path(hfObj, ['attributes', 'foo', 0, 'bar', 1])).to.be.undefined;
      });
    });
  });
});
