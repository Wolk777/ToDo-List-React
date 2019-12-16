import { CHANGE_CORTING } from '../constans';

const basicSorting = 'default';

const sorting = (state = basicSorting, { type, sortBy }) => {
  switch (type) {
    case CHANGE_CORTING:
      return sortBy;
      break;
    default:
      return state;
  }
};

export default sorting;
