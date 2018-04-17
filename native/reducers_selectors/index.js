import { combineReducers } from 'redux';
import { createSelector } from 'reselect';

import activeRequests, { selectors as activeRequestsSelectors } from './active_requests';
import login, { selectors as loginSelectors } from './login';

export default combineReducers({ activeRequests, login });

export const selectors = createSelector(
  state => state,
  state => ({
    getActiveRequestsSelectors: () => activeRequestsSelectors(state.activeRequests),
    getLoginSelectors: () => loginSelectors(state.login)
  })
);
