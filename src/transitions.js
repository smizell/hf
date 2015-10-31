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
      if (_.isMatch(transitions[i], conditions)) return transitions[i];
    }
  },

  filterBy: (transitions = [], conditions) => {
    return transitions.filter(transition => {
      return _.isMatch(transition, conditions);
    });
  },
};
