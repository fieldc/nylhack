/**
 * Created by chris on 10/9/16.
 */

import {
  CHAT_START,
  CHAT_RECV,
  CHAT_SEND,
  CHAT_COMPOSING,
  CHAT_ONLINE,
  RECEIVE_TOKEN,
  subscribeChannel
} from '../actions';

// import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const initialState = {
  id: '',
  detail: {},
  composing: '',
  messages: [],
  token: '',
  accessManager: {},
  messagingClient: {},
  generalChannel: {},
  online: false
};

export const chat = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_TOKEN:
      return {
        ...state,
        token: action.token
      };
    case CHAT_START:
      console.log('starting chat token=' + state.token.token);
      var am = new Twilio.AccessManager(state.token.token);
      var messagingClient = new Twilio.IPMessaging.Client(am);
      var promise = messagingClient.getChannelByUniqueName('general');
      promise.then(function(channel, gc) {
        var generalChannel = channel;
        if (!generalChannel) {
          // If it doesn't exist, let's create it
          messagingClient.createChannel({
            uniqueName: 'general',
            friendlyName: 'Mentor Chat Channel'
          }).then(function(channel) {
            console.log('Created general channel:');
            console.log(channel);
            generalChannel = channel;
            subscribeChannel(generalChannel);
          });
        } else {
          console.log('Found general channel:');
          console.log(generalChannel);
          subscribeChannel(generalChannel);
        }
      });
      return {
        ...state,
        accessManager: am,
        messagingClient: messagingClient
      };
    case CHAT_ONLINE:
      return {
        ...state,
        online: true,
        generalChannel: action.channel
      };
    case CHAT_COMPOSING:
      return {
        ...state,
        composing: action.message
      };
    case CHAT_RECV:
      console.log('here now');
      state.messages.push(action);
      return {
        ...state,
        messages: state.messages
      };
    case CHAT_SEND:
      window.generalChannel.sendMessage(action.message);
      state.messages.push(action);
      return {
        ...state,
        messages: state.messages,
        composing: ''
      };
    default:
      return state;
  }
};

export default chat;
