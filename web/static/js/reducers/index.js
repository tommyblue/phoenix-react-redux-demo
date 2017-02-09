import { combineReducers } from 'redux';
import documents from './documents.js';
import isLoading from './isLoading.js';

const mainApp = combineReducers({
  isLoading,
  documents,
});
export default mainApp;
