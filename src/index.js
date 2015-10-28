import transitionsFn from './transitions';

export default {
  getByRel: (obj, rel) => {
    return transitionsFn.getByRel(obj.transitions, rel);
  },

  filterByRel: (obj, rel) => {
    return transitionsFn.filterByRel(obj.transitions, rel);
  },

  filterByTag: (obj, tag) => {
    return transitionsFn.filterByTag(obj.transitions, tag);
  },

  transitions: (obj = {}) => {
    return obj.transitions || [];
  },

  attributes: (obj) => {
    return obj.attributes || {};
  },

  path: (obj = {}, steps = []) => {
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
