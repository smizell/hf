import _ from './utils';

function getTransitions(value) {
  if (_.isArray(value)) return value;
  if (_.isObject(value)) return value.transitions;
}

export default {
  has: (value = {}, conditions = {}) => !!_.find(getTransitions(value), conditions),
  find: (value = {}, conditions = {}) => _.find(getTransitions(value), conditions),
  filter: (value = {}, conditions = {}) => _.filter(getTransitions(value), conditions),
  metaAttributes: obj => _.get(obj, 'meta.attributes', {}),
  metaLinks: obj => _.get(obj, 'meta.links', []),
  attributes: obj => _.get(obj, 'attributes', {}),
  transitions: obj => _.get(obj, 'transitions', []),
  get: _.get,
};
