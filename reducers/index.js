import {combineReducers} from 'redux';
import selectedLocation from './selectedLocation';
import locations from './locations';
import dialog from './dialog';
import mentee from './mentee';
import mentor from './mentor';

const todoApp = combineReducers({
  locations,
  selectedLocation,
  dialog,
  mentee,
  mentor
});

export default todoApp;
