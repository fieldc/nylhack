/**
 * Created by chris on 10/9/16.
 */
import {
  NAV_MENTEE,
  CHANGE_MENTEE_TAB
} from '../actions';

// import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux';

const initialState = {
  name: '',
  index: 0
};

export const mentee = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_MENTEE_TAB:
      return {
        ...state,
        index: action.index
      };
    case NAV_MENTEE:
      return {
        ...state,
        id: action.id,
        name: action.name

      };
    default:
      return state;
  }
};

export default mentee;
