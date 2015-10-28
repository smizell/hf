import _ from './utils';
import transitionsFn from './transitions';

export default {
  getByRel: (obj = {}, rel) => {
    if (!_.isObject(obj)) return undefined;
    return transitionsFn.getByRel(obj.transitions, rel);
  },

  filterByRel: (obj = {}, rel) => {
    if (!_.isObject(obj)) return [];
    return transitionsFn.filterByRel(obj.transitions, rel);
  },

  filterByTag: (obj = {}, tag) => {
    if (!_.isObject(obj)) return [];
    return transitionsFn.filterByTag(obj.transitions, tag);
  },

  attributes: (obj = {}) => {
    if (!_.isObject(obj)) return {};
    return obj.attributes || {};
  },

  transitions: (obj = {}) => {
    if (!_.isObject(obj)) return [];
    return obj.transitions || [];
  },

  path: (obj = {}, steps = []) => {
    if (!_.isObject(obj)) return undefined;
    if (!_.isArray(steps)) return undefined;
    if (steps.length === 0 ) return undefined;
    let value;

    // Try to get the first step
    const firstStep = obj[steps[0]];

    if (firstStep && steps.length === 1) {
      return firstStep;
    } else if (firstStep) {
      value = firstStep;
    } else {
      return undefined;
    }

    // Loop through the remainder of steps
    for (const step of steps.slice(1)) {
      if (value[step]) {
        value = value[step];
      } else {
        return undefined;
      }
    }

    return value;
  },
};
