import {
  SET_BUZZES,
  LOADING_DATA,
  LIKE_BUZZ,
  UNLIKE_BUZZ,
  DELETE_BUZZ
} from "../types";

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
    case DELETE_BUZZ:
      // accessing `index` var alredy declared above result to `can't access lexical declaration 
      //`index' before initialization` hence the need to rename the var
      let buzzIndex = state.buzzes.findIndex(
        buzz => buzz.buzzId === action.payload
      );
      state.buzzes.splice(buzzIndex, 1);
      return {
        ...state
      };
    default:
      return state;
  }
};
