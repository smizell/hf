import _ from './utils';

export default {
  all: (obj = {}) => {
    return obj.transitions || [];
  },

  getByRel: (transitions = [], rel) => {
    let link;

    // Returns the embedded transition first if it finds it
    for (const transition of transitions) {
      if (_.include(transition.rels, rel)) {
        if (transition.tag === 'embed') return transition;
        if (transition.tag === 'link' && !link) link = transition;
      }
    }

    if (link) return link;
    return undefined;
  },

  filterByRel: (transitions = [], rel) => {
    return transitions.filter(transition => {
      return _.include(transition.rels, rel);
    });
  },

  filterByTag: (transitions = [], tag) => {
    return transitions.filter(transition => {
      return transition.tag === tag;
    });
  },
};
