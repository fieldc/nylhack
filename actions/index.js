import {v4 as generateId} from 'node-uuid';

import {queryWeather, getToken} from '../api';

export const ADD_LOCATION = 'ADD_LOCATION';
export const REMOVE_LOCATION = 'REMOVE_LOCATION';
export const SELECT_LOCATION = 'SELECT_LOCATION';

export const REQUEST_WEATHER = 'REQUEST_WEATHER';
export const RECEIVE_WEATHER = 'RECEIVE_WEATHER';
export const SET_FETCH_ERROR = 'SET_FETCH_ERROR';

export const OPEN_DIALOG = 'OPEN_DIALOG';
export const CLOSE_DIALOG = 'CLOSE_DIALOG';

export const NAV_MENTOR = 'NAV_MENTOR';
export const NAV_MENTEE = 'NAV_MENTEE';
export const CHANGE_MENTEE_TAB = 'CHANGE_MENTEE_TAB';
export const CHANGE_MENTOR_TAB = 'CHANGE_MENTOR_TAB';

export const NAV_WEATHER = 'NAV_WEATHER';

export const CALL_START = 'CALL_START';
export const CHAT_START = 'CHAT_START';
export const CHAT_ONLINE = 'CHAT_ONLINE';
export const SET_ROLE = 'SET_ROLE';
export const SET_MENTEE = 'SET_MENTEE';
export const SET_MENTOR = 'SET_MENTOR';

export const LOG_CALL = 'LOG_CALL';
export const LOG_CHAT = 'LOG_CHAT';
export const CHAT_COMPOSING = 'CHAT_COMPOSING';
export const CHAT_SEND = 'CHAT_SEND';
export const CHAT_RECV = 'CHAT_RECV';
export const LOG_VIDEO = 'LOG_VIDEO';
export const LOG_EMAIL = 'LOG_EMAIL';

export const ADD_USER = 'ADD_USER,';
export const REMOVE_USER = 'REMOVE_USER,';
export const REQUEST_TOKEN = 'REQUEST_TOKEN,';
export const RECEIVE_TOKEN = 'RECEIVE_TOKEN,';
export const SET_USER_FETCH_ERROR = 'SET_USER_FETCH_ERROR';
import {bindActionCreators} from 'redux';

export const addLocation = (name) => ({
  type: ADD_LOCATION,
  id: generateId(),
  name
});

export const addUser = (name) => ({
  type: ADD_USER,
  name
});

export const removeLocation = id => ({
  type: REMOVE_LOCATION,
  id
});

export const selectLocation = id => ({
  type: SELECT_LOCATION,
  id
});

export const requestWeather = (id) => ({
  type: REQUEST_WEATHER,
  id
});

export const requestToken = (name) => ({
  type: REQUEST_TOKEN,
  name
});

export const receiveWeather = (id, data) => ({
  type: RECEIVE_WEATHER,
  id,
  ...data
});

export const receiveToken = (name, token) => ({
  type: RECEIVE_TOKEN,
  name,
  token
});

export const setFetchError = id => ({
  type: SET_FETCH_ERROR,
  id
});

export const setTokenFetchError = name => ({
  type: SET_USER_FETCH_ERROR,
  name
});

export const fetchWeather = (id) => {
  /*
   * This function requests and receives the
   * weather data asynchronously.
   */
  return (dispatch, getState) => {
    const name = getState().locations[id].name;

    dispatch(requestWeather(id));
    queryWeather(name)
      .catch(() => dispatch(setFetchError(id)))
      .then((data) => dispatch(receiveWeather(id, data)));
  };
};

export const addLocationAndFetchWeather = name => {
  return (dispatch, getState) => {
    const id = dispatch(addLocation(name)).id;
    dispatch(fetchWeather(id));
  };
};

export const fetchToken = (user, device) => {
  return (dispatch, getState) => {
    dispatch(requestToken(user));
    getToken(user, device)
      .catch((e) => { console.log('message is:', e); dispatch(setTokenFetchError(user)); })
      .then((token) => {
        dispatch(receiveToken(user, token));
        dispatch(startChat());
      });
  };
};

export const addUserAndFetchToken = (name) => {
  return (dispatch, getState) => {
    const n = dispatch(addUser(name)).name;
    dispatch(fetchToken(name, n));
  };
};

export const logCall = (desc) => ({
  type: LOG_CALL,
  desc: desc
});

export const composingMessage = (message) => ({
  type: CHAT_COMPOSING,
  message
});

export const sendMessage = (message) => ({
  type: CHAT_SEND,
  direction: 'sent',
  time: new Date().toLocaleTimeString(),
  message
});

export const receiveMessage = (message) => ({
  type: CHAT_RECV,
  direction: 'recv',
  time: new Date().toLocaleTimeString(),
  message
});

export const subscribeChannel = (channel) => {
  console.log('joining gen chan');
  channel.join();
  console.log('joined gen chan');
  channel.on('messageAdded', function(message) {
    console.log('got message', message);
    receiveMessage(message);
  });
  channel.sendMessage('test');
  window.generalChannel = channel;
};

export const chatOnline = (channel) => ({
  type: CHAT_ONLINE,
  channel: channel
});

export const startChat = () => ({
  type: CHAT_START
});

export const logChat = (desc = 'Chat Conversation') => ({
  type: LOG_CHAT,
  desc
});

export const logVideo = (desc) => ({
  type: LOG_VIDEO,
  desc: desc
});

export const logEmail = (desc) => ({
  type: LOG_EMAIL,
  desc: desc
});

export const openDialog = () => ({
  type: OPEN_DIALOG
});

export const closeDialog = () => ({
  type: CLOSE_DIALOG
});

export const navMentor = (name) => ({
  type: NAV_MENTOR,
  name
});

export const navMentee = (name) => ({
  type: NAV_MENTEE,
  name
});

export const changeMentorTab = (index) => ({
  type: CHANGE_MENTOR_TAB,
  index
});

export const changeMenteeTab = (index) => ({
  type: CHANGE_MENTEE_TAB,
  index
});

export const navWeather = () => ({
  type: NAV_WEATHER
});

