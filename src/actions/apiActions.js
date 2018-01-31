import * as types from './types';
import axios from 'axios';

function setArtist(artist) {
  return dispatch => {
    dispatch({ type: types.SET_NAME, payload: artist });
  };
}

function getResults(artist_name) {
  return async dispatch => {
    try {
      let results = await axios.get(
        `http://itunes.apple.com/search?term=${artist_name}`
      );

      dispatch({ type: types.FETCH_RESULTS, payload: results.data.results });
    } catch (err) {
      dispatch({ type: types.ERROR_ON_FETCH, payload: err });
    }
  };
}

function resetState() {
  return dispatch => {
    dispatch({ type: types.RESET_API_STATE });
  };
}

export { setArtist, getResults, resetState };
