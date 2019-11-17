import { SET_BUZZES, LOADING_DATA, LIKE_BUZZ, UNLIKE_BUZZ } from "../types";

const initialState = {
  buzzes: [],
  buzz: {},
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case SET_BUZZES:
      return {
        ...state,
        loading: false,
        buzzes: action.payload
      };
    case LIKE_BUZZ:
    case UNLIKE_BUZZ:
      let index = state.buzzes.findIndex(
        buzz => buzz.buzzId === action.payload.buzzId
      );
      state.buzzes[index] = action.payload;
      return {
        ...state
      };
    default:
      return state;
  }
};
