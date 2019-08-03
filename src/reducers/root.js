import {
    REQUEST_ITEMS,
    REQUEST_ITEMS_SUCCESS,
    REQUEST_ITEMS_ERROR
} from '../actions/rootActions';

const initialState = {
    currentDir: '/',
    error: null,
    folders: []
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_ITEMS:
      return {
        ...state,
        loading: true
      }
    case REQUEST_ITEMS_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        currentDir: action.payload.currentDir,
        folders: action.payload.folders
      }
    case REQUEST_ITEMS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    default:
  }
  return state;
}