import { Actions } from '../platform/constants';

export const updateActiveRequests = payload => ({
  type: Actions.UPDATE_ACTIVE_REQUESTS,
  ...payload
});
