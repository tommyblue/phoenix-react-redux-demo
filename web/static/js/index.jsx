import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import mainApp from './reducers';
import DocumentsTable from './containers/DocumentsTable.jsx';

const initialState = {
  documents: [],
};

const store = createStore(
  mainApp,
  initialState,
  applyMiddleware(
    thunkMiddleware,
  ),
);

render(
  <Provider store={store}>
    <DocumentsTable />
  </Provider>,
  document.getElementById('app'),
);
