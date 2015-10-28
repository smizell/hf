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

  path: (obj = {}, steps = [], defaultValue) => {
    if (!_.isObject(obj)) return undefined;
    if (!_.isArray(steps)) return undefined;
    if (steps.length === 0 ) return undefined;
    let value;

    // Try to get the first step
    const firstStep = obj[steps[0]];

    // No need to continue if there isn't a match or if only one step
    if (!firstStep) {
      return defaultValue;
    } else if (firstStep && steps.length === 1) {
      return firstStep;
    }

    // We've made it this far, so we have an initial value
    value = firstStep;

    // Loop through the remainder of steps, hence starting at 1
    for (let i = 1; i < steps.length; i++) {
      if (value[steps[i]]) {
        value = value[steps[i]];
      } else {
        return undefined;
      }
    }

    return value || defaultValue;
  },
};
