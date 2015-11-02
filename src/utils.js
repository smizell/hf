import isString from 'lodash.isstring';
import isObject from 'lodash.isobject';
import isArray from 'lodash.isarray';
import includes from 'lodash.includes';
import isMatch from 'lodash.ismatch';

export default {
  includes,
  isObject,
  isArray,
  isString,
  isMatch,

  has: (transitions = [], conditions) => {
    for (let i = 0; i < transitions.length; i++) {
      if (isMatch(transitions[i], conditions)) return true;
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
        if (isMatch(transitions[i], conditions)) {
          return transitions[i];
        }
      }
    }
  },

  filterBy: (transitions = [], conditions) => {
    if (typeof (conditions) === 'function') return transitions.filter(conditions);
    return transitions.filter(transition => {
      return isMatch(transition, conditions);
    });
  },
};
