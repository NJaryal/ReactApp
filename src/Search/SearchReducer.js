import { UPDATE_SEARCH_TEXT } from './SearchActions';

function SearchReducer(state = {
  inputs: '',
}, action) {
  switch (action.type) {
    case UPDATE_SEARCH_TEXT:
      return {
        ...state,
        inputs: action.searchText,
      };

    default:
      return state;
  }
}
export default SearchReducer;
