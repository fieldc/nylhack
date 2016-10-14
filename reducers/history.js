/**
 * Created by chris on 10/9/16.
 */
import {
  LOG_CALL,
  LOG_CHAT,
  LOG_EMAIL,
  LOG_VIDEO
} from '../actions';

// import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux';

const initialState = {
  history: []
};

export const history = (state = initialState, action) => {
  switch (action.type) {
    case LOG_CHAT:
    case LOG_EMAIL:
    case LOG_VIDEO:
    case LOG_CALL:
      state.history.unshift({...action, time: new Date().toLocaleTimeString()});
      return {
        ...state
      };

    default:
      return state;
  }
};

export default history;
