import _ from './utils';

export default {
  has: (value = {}, conditions = {}) => {
    if (!_.isObject(conditions)) return false;
    if (_.isArray(value)) return !!_.find(value, conditions);
    if (_.isObject(value)) return !!_.find(value.transitions, conditions);
    return false;
  },

  getBy: (value = {}, conditions = {}) => {
    if (!_.isObject(conditions) && typeof (conditions) !== 'function') return undefined;
    if (_.isArray(value)) return _.getBy(value, conditions);
    if (_.isObject(value)) return _.getBy(value.transitions, conditions);
    return undefined;
  },

  filterBy: (value = {}, conditions = {}) => {
    if (!_.isObject(conditions) && typeof (conditions) !== 'function') return [];
    if (_.isArray(value)) return _.filterBy(value, conditions);
    if (_.isObject(value)) return _.filterBy(value.transitions, conditions);
    return [];
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

  path: _.path,
};
