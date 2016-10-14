import {combineReducers} from 'redux';
import selectedLocation from './selectedLocation';
import locations from './locations';
import dialog from './dialog';
import mentee from './mentee';
import mentor from './mentor';
import call from './call';
import chat from './chat';
import history from './history';
import users from './users';

const todoApp = combineReducers({
  locations,
  selectedLocation,
  dialog,
  mentee,
  mentor,
  call,
  chat,
  history,
  users
});

export default todoApp;
