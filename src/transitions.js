import _ from './utils';

export default {
  all: (obj = {}) => {
    return obj.transitions || [];
  },

  getByRel: (transitions = [], rel) => {
    let link;

    // Returns the embedded transition first if it finds it
    for (let i = 0; i < transitions.length; i++) {
      if (_.includes(transitions[i].rels, rel)) {
        if (transitions[i].tag === 'embed') return transitions[i];
        if (transitions[i].tag === 'link' && !link) link = transitions[i];
      }
    }

    // If a link was not found above, this will be undefined
    return link;
  },

  filterByRel: (transitions = [], rel) => {
    return transitions.filter(transition => {
      return _.includes(transition.rels, rel);
    });
  },

  filterByTag: (transitions = [], tag) => {
    return transitions.filter(transition => {
      return transition.tag === tag;
    });
  },
};
