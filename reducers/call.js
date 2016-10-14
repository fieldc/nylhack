/**
 * Created by chris on 10/9/16.
 */
import {
  CALL_START
} from '../actions';

// import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux';

const initialState = {
  id: '',
  detail: {}
};

export const call = (state = initialState, action) => {
  switch (action.type) {
    case CALL_START:
      return {
        ...state,
        id: action.id,
        detail: action.detail
      };
    default:
      return state;
  }
};

export default call;
