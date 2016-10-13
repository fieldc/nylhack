/**
 * Created by chris on 10/9/16.
 */
import {
  NAV_MENTOR
} from '../actions';

// import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux';

const initialState = {
  name: ''
};

export const mentor = (state = initialState, action) => {
  switch (action.type) {
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
