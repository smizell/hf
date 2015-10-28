function isArray(array) {
  return Array.isArray(array);
}

export default {
  include: (array = [], item) => {
    return array.indexOf(item) >= 0;
  },

  isObject: (obj) => {
    return obj !== null && typeof obj === 'object' && !isArray(obj);
  },

  isArray,
};
