import { Actions } from '../platform/constants';

export default (state = {}, action) => {
  const { type, status } = action;
  switch (type) {
    case Actions.LOGIN_API_SUCCEEDED:
      /**
       -1 = "/login" route threw Error
        0 = API call has not been made
        1 = Login successful
        2 = Login from Loading Screen failed
        3 = Login from Login Screen failed
      */
      if (status) {
        return { ...state, status: 1 };
      }
      return { ...state, status: 2 };
    case Actions.LOGIN_API_FAILED:
      return { ...state, status: -1 };
    case Actions.LOGOUT:
      return { ...state, status: 0 };
    default:
      return state;
  }
};

export const selectors = (state = {}) => ({
  getLoginStatus: () => state.status
});
