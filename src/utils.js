export default {
  include: (array = [], item) => {
    return array.indexOf(item) >= 0;
  },
};
