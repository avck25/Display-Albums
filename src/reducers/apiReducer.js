import * as types from '../actions/types';

const apiState = {
  artist: '',
  results: [],
  hasError: null,
  errMessage: ''
};

export default function apiReducer(state = apiState, action) {
  switch (action.type) {
    case types.SET_NAME:
      return { ...state, artist: action.payload };

    case types.FETCH_RESULTS:
      return { ...state, results: action.payload };

    case types.ERROR_ON_FETCH:
      return { ...state, hasError: true, errMessage: action.payload };

    case types.RESET_API_STATE:
      return {
        ...state,
        artist: '',
        hasError: null,
        errMessage: '',
        results: []
      };
    default:
      return state;
  }
}
