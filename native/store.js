import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers_selectors';

// TODO: tmp starting store
const preloadedStore = {
  login: {
    status: 0
  }
};

// Connect our store to the reducers
export default createStore(rootReducer, preloadedStore, applyMiddleware(thunk));
