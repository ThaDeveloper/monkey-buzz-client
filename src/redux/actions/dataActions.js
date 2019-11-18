import {
  SET_BUZZES,
  LOADING_DATA,
  LIKE_BUZZ,
  UNLIKE_BUZZ,
  DELETE_BUZZ,
  LOADING_UI,
  CLEAR_ERRORS,
  SET_ERRORS,
  POST_BUZZ,
  SET_BUZZ,
  STOP_LOADING
} from "../types";
import axios from "axios";

// get all buzzes
export const getBuzzes = () => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/buzzes")
    .then(res => {
      dispatch({
        type: SET_BUZZES,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: SET_BUZZES,
        payload: []
      });
    });
};

//get buzz
export const getBuzz = buzzId => dispatch => {
  dispatch({ type: LOADING_UI});
  axios.get(`/buzzes/${buzzId}`)
    .then(res => {
      dispatch({
        type: SET_BUZZ,
        payload: res.data
      });
      dispatch({ type: STOP_LOADING });
    })
    .catch(err => {
      console.log(err);
    })
}

// post buzz
export const postBuzz = newBuzz => dispatch => {
  dispatch({ type: LOADING_UI });
  axios.post('/buzzes', newBuzz)
    .then(res => {
      dispatch({
        type: POST_BUZZ,
        payload: res.data
      });
      dispatch({ type: CLEAR_ERRORS});
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      })
    });
}

//like buzz
export const likeBuzz = buzzId => dispatch => {
  axios
    .get(`/buzzes/${buzzId}/like`)
    .then(res => {
      dispatch({
        type: LIKE_BUZZ,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

//unlike buzz
export const unlikeBuzz = buzzId => dispatch => {
  axios
    .get(`/buzzes/${buzzId}/unlike`)
    .then(res => {
      dispatch({
        type: UNLIKE_BUZZ,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

export const deleteBuzz = buzzId => dispatch => {
  axios
    .delete(`/buzzes/${buzzId}`)
    .then(() => {
      dispatch({
        type: DELETE_BUZZ,
        payload: buzzId
      });
    })
    .catch(err => console.log(err));
};

export const clearErrors = () => dispatch => {
  dispatch({ type: CLEAR_ERRORS});
}
