import React from 'react';
import {render} from 'react-dom';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import {AppContainer} from 'react-hot-loader';

import weatherApp from './reducers';
import App from './components/App';

import 'onsenui';
import 'onsenui/css/onsenui.css';
import './stylus/index.styl';

import './icons/css/weather-icons.css';

const logger = createLogger();

const store = createStore(weatherApp,
  window.devToolsExtension ? window.devToolsExtension() : f => f,
  process.NODE_ENV === 'production'
    ? applyMiddleware(thunk)
    : applyMiddleware(thunk, logger)
);

import {addLocationAndFetchWeather} from './actions';

[
  'Tokyo',
  'New York',
  'Paris',
  'Beijing',
  'Sydney',
  'Buenos Aires'
].forEach((city) => store.dispatch(addLocationAndFetchWeather(city)));

const rootElement = document.getElementById('root');

render(
  <AppContainer>
    <Provider store={store}>
      <App />
    </Provider>
  </AppContainer>,
  rootElement
);

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
