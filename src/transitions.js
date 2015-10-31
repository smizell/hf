import _ from './utils';

export default {
  has: (transitions = [], conditions) => {
    for (let i = 0; i < transitions.length; i++) {
      if (_.isMatch(transitions[i], conditions)) return true;
    }
    return false;
  },

  getBy: (transitions = [], conditions) => {
    for (let i = 0; i < transitions.length; i++) {
      if (typeof (conditions) === 'function') {
        if (conditions(transitions[i])) {
          return transitions[i];
        }
      } else {
        if (_.isMatch(transitions[i], conditions)) {
          return transitions[i];
        }
      }
    }
  },

  filterBy: (transitions = [], conditions) => {
    return transitions.filter(transition => {
      if (typeof (conditions) === 'function') return conditions(transition);
      return _.isMatch(transition, conditions);
    });
  },
};
