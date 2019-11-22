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
  STOP_LOADING,
  SUBMIT_COMMENT
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
  dispatch({ type: LOADING_UI });
  axios
    .get(`/buzzes/${buzzId}`)
    .then(res => {
      dispatch({
        type: SET_BUZZ,
        payload: res.data
      });
      dispatch({ type: STOP_LOADING });
    })
    .catch(err => {
      console.log(err);
    });
};

// post buzz
export const postBuzz = newBuzz => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/buzzes", newBuzz)
    .then(res => {
      dispatch({
        type: POST_BUZZ,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

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

//post comment
export const submitComment = (buzzId, commentData) => dispatch => {
  axios
    .post(`/buzzes/${buzzId}/comments`, commentData)
    .then(res => {
      dispatch({
        type: SUBMIT_COMMENT,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};
//delete buzz
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

export const getUserData = userHandle => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/user/${userHandle}`)
    .then(res => {
      dispatch({
        type: SET_BUZZES,
        payload: res.data.buzzes
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: SET_BUZZES,
        payload: null
      });
    });
};
export const clearErrors = () => dispatch => {
  dispatch({ type: CLEAR_ERRORS });
};
