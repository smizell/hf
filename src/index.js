import _ from './utils';
import transitionsFn from './transitions';

export default {
  has: (value = {}, conditions = {}) => {
    if (!_.isObject(conditions)) return false;
    if (_.isArray(value)) return transitionsFn.has(value, conditions);
    if (_.isObject(value)) return transitionsFn.has(value.transitions, conditions);
    return false;
  },

  getBy: (value = {}, conditions = {}) => {
    if (!_.isObject(conditions) && typeof (conditions) !== 'function') return undefined;
    if (_.isArray(value)) return transitionsFn.getBy(value, conditions);
    if (_.isObject(value)) return transitionsFn.getBy(value.transitions, conditions);
    return undefined;
  },

  filterBy: (value = {}, conditions = {}) => {
    if (!_.isObject(conditions) && typeof (conditions) !== 'function') return [];
    if (_.isArray(value)) return transitionsFn.filterBy(value, conditions);
    if (_.isObject(value)) return transitionsFn.filterBy(value.transitions, conditions);
    return [];
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
    if (!_.isObject(obj) && !_.isArray(obj)) return undefined;
    if (!_.isArray(steps)) return undefined;
    if (steps.length === 0 ) return undefined;

    // Try to get the first step
    const firstStep = obj[steps[0]];

    // No need to continue if there isn't a match or if only one step
    if (firstStep === undefined) {
      return defaultValue;
    } else if (firstStep && steps.length === 1) {
      return firstStep;
    }

    // We've made it this far, so we have an initial value
    let value = firstStep;

    // Loop through the remainder of steps, hence starting at 1
    for (let i = 1; i < steps.length; i++) {
      if (value[steps[i]] !== undefined) {
        value = value[steps[i]];
      } else {
        return undefined;
      }
    }

    // Allows for returning null values
    if (value !== undefined) return value;
    return defaultValue;
  },
};
