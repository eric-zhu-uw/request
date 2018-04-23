/* eslint no-undef: 0 */
/* eslint global-require: 0 */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { validateLogin, logout } from '../login';
import { Actions } from '../../platform/constants';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('native/action_creators/login.js', () => {
  describe('#validateLogin', () => {
    it('validateLogin action creator returns correct payload on successful fetch', () => {
      window.fetch = jest.fn().mockReturnValue(Promise.resolve({ ok: true }));
      const store = mockStore({});
      return store.dispatch(validateLogin()).then(() => {
        const actions = store.getActions();
        expect(window.fetch).toHaveBeenCalledTimes(1);
        expect(actions[0]).toEqual({ type: Actions.LOGIN_API_SUCCEEDED, status: true });
      });
    });

    it('validateLogin action creator returns correct payload on failed fetch', () => {
      window.fetch = jest.fn().mockReturnValue(Promise.reject());
      const store = mockStore({});
      return store.dispatch(validateLogin()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({ type: Actions.LOGIN_API_FAILED });
      });
    });
  });

  describe('#logout', () => {
    it('logout action creator returns correct payload', () => {
      expect(logout()).toEqual({ type: Actions.LOGOUT });
    });
  });
});
