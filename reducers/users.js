import {
  ADD_USER,
  REMOVE_USER,
  REQUEST_TOKEN,
  RECEIVE_TOKEN,
  SET_USER_FETCH_ERROR
} from '../actions';

const initialState = {
  isFetching: false,
  isInvalid: false,
  name: '',
  token: ''
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        name: action.name,
        ...state
      };
    case REQUEST_TOKEN:
      return {
        ...state,
        isFetching: true,
        isInvalid: false
      };
    case RECEIVE_TOKEN:
      return {
        ...state,
        isFetching: false,
        isInvalid: false,
        ...action
      };
    case SET_USER_FETCH_ERROR:
      return {
        ...state,
        isFetching: false,
        isInvalid: true
      };
    default:
      return state;
  }
};

const users = (state = {}, action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        [action.name]: user(undefined, action)
      };
    case REMOVE_USER:
      const {...rest} = state;
      delete rest[action.name];
      return rest;
    case SET_USER_FETCH_ERROR:
    case REQUEST_TOKEN:
    case RECEIVE_TOKEN:
      return {
        ...state,
        [action.name]: user({...state[action.name]}, action)
      };
    default:
      return state;
  }
};

export default users;
