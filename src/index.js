import _ from './utils';

function getTransitions(value) {
  if (_.isArray(value)) return value;
  if (_.isObject(value)) return value.transitions;
}

export default {
  has: (value = {}, conditions = {}) => {
    return !!_.find(getTransitions(value), conditions);
  },

  find: (value = {}, conditions = {}) => {
    return _.find(getTransitions(value), conditions);
  },

  filter: (value = {}, conditions = {}) => {
    return _.filter(getTransitions(value), conditions);
  },

  metaAttributes: (obj = {}) => {
    if (!_.isObject(obj)) return {};
    if (!_.isObject(obj.meta)) return {};
    return obj.meta.attributes || {};
  },

  metaLinks: (obj = {}) => {
    if (!_.isObject(obj)) return [];
    if (!_.isObject(obj.meta)) return [];
    return obj.meta.links || [];
  },

  attributes: (obj = {}) => {
    if (!_.isObject(obj)) return {};
    return obj.attributes || {};
  },

  transitions: (obj = {}) => {
    if (!_.isObject(obj)) return [];
    return obj.transitions || [];
  },

  get: _.get,
};
