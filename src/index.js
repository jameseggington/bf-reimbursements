import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import reducer from './reducer'
import initialState from './initialState'
import './../node_modules/skeleton-css/css/skeleton.css';
import './App.css';
import './index.css';

// The store should only overwrite those props that are given when updating -
// for example, if only the users name is present in the updated user, then
// other user props should be unchanged after the action.
var store = createStore(
  reducer,
  initialState,
  applyMiddleware(thunk)
);
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
