import filter from 'lodash.filter';
import find from 'lodash.find';
import isString from 'lodash.isstring';
import isObject from 'lodash.isobject';
import isArray from 'lodash.isarray';
import includes from 'lodash.includes';
import isMatch from 'lodash.ismatch';
import path from 'lodash.get';

export default {
  find,
  filter,
  includes,
  isObject,
  isArray,
  isString,
  isMatch,
  path,

  getBy: find,
  filterBy: filter,
};
