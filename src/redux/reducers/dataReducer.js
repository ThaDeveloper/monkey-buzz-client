import {
  SET_BUZZES,
  LOADING_DATA,
  LIKE_BUZZ,
  UNLIKE_BUZZ,
  DELETE_BUZZ,
  POST_BUZZ,
  SET_BUZZ,
  SUBMIT_COMMENT
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
    case SET_BUZZ:
      return {
        ...state,
        buzz: action.payload
      }
    case LIKE_BUZZ:
    case UNLIKE_BUZZ:
      let index = state.buzzes.findIndex(
        buzz => buzz.buzzId === action.payload.buzzId
      );
      state.buzzes[index] = action.payload;
      // update the buzz liked in the buzz dialog
      if(state.buzz.buzzId === action.payload.buzzId){
        state.buzz = action.payload
      }
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
    case POST_BUZZ:
      return {
        ...state,
        buzzes: [
          action.payload,//add the new post at the top of array
          ...state.buzzes
        ]
      }
    case SUBMIT_COMMENT:
      return {
        ...state,
        buzz: {
          ...state.buzz,
          comments: [action.payload, ...state.buzz.comments]
        }
      }
    default:
      return state;
  }
};
