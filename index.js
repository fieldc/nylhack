import React from 'react';
import {render} from 'react-dom';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import {AppContainer} from 'react-hot-loader';

import weatherApp from './reducers';
import App from './components/App';

import './icons/css/weather-icons.css';

import ons from 'onsenui';
import 'onsenui/css/onsenui.css';
import './stylus/index.styl';

const logger = createLogger();

const store = createStore(weatherApp,
  window.devToolsExtension ? window.devToolsExtension() : f => f,
  process.env.NODE_ENV === 'production'
    ? applyMiddleware(thunk)
    : applyMiddleware(thunk, logger)
 );

import {addUserAndFetchToken} from './actions';
[
  'Jane',
  'John'
].forEach((user) => store.dispatch(addUserAndFetchToken(user)));

const rootElement = document.getElementById('root');

ons.ready(() => {
  window.generalChannel = {};
  return render(<AppContainer>
        <Provider store={store}>
          <App />
        </Provider>
      </AppContainer>,
      rootElement);
});

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NextApp = require('./components/App').default;
    render(
      <AppContainer>
        <Provider store={store}>
          <NextApp />
        </Provider>
      </AppContainer>,
      rootElement
    );
  });
}
