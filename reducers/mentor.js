/**
 * Created by chris on 10/9/16.
 */
import {
  NAV_MENTOR,
  CHANGE_MENTOR_TAB
} from '../actions';

// import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux';

const initialState = {
  index: 0,
  name: ''
};

export const mentor = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_MENTOR_TAB:
      return {
        ...state,
        index: action.index
      };
    case NAV_MENTOR:
      return {
        ...state,
        id: action.id,
        name: action.name
      };
    default:
      return state;
  }
};

export default mentor;
