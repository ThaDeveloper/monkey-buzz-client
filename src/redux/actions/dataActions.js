import { SET_BUZZES, LOADING_DATA, LIKE_BUZZ, UNLIKE_BUZZ } from "../types";
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
