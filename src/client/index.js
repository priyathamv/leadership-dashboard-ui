import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';

import rootReducers from './reducers/root_reducer';
import App from './components/app';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(<Provider store={createStoreWithMiddleware(rootReducers)}>
                  <App />
                </Provider> , document.getElementById('dashboardId'));
