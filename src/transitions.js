import _ from './utils';

export default {
  hasRel: (transitions = [], rel) => {
    for (let i = 0; i < transitions.length; i++) {
      if (transitions[i].rel === rel) return true;
    }
    return false;
  },

  getBy: (transitions = [], conditions) => {
    for (let i = 0; i < transitions.length; i++) {
      if (_.isMatch(transitions[i], conditions)) return transitions[i];
    }
  },

  getByRel: (transitions = [], rel) => {
    let link;

    // Returns the embedded transition first if it finds it
    for (let i = 0; i < transitions.length; i++) {
      if (transitions[i].rel === rel) {
        if (transitions[i].tag === 'embed') return transitions[i];
        if (transitions[i].tag === 'link' && !link) link = transitions[i];
      }
    }

    // If a link was not found above, this will be undefined
    return link;
  },

  filterByRel: (transitions = [], rel) => {
    return transitions.filter(transition => {
      return transition.rel === rel;
    });
  },

  filterBy: (transitions = [], conditions) => {
    return transitions.filter(transition => {
      return _.isMatch(transition, conditions);
    });
  },

  filterByTag: (transitions = [], tag) => {
    return transitions.filter(transition => {
      return transition.tag === tag;
    });
  },
};
