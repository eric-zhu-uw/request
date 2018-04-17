import { Action } from '../platform/constants';

export const updateActiveRequests = payload => ({
  type: Action.UPDATE_ACTIVE_REQUESTS,
  ...payload
});
