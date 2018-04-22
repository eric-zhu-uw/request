/* eslint no-undef: 0 */
/* eslint global-require: 0 */
import reducer, { selectors } from '../login';
import { Actions } from '../../platform/constants';

describe('native/reducers_selectors/login.js', () => {
  describe('#reducer', () => {
    it('test state = undefined and default action', () => {
      expect(reducer(undefined, { type: '' })).toEqual({});
    });

    it('test state = {status: 0} and default action', () => {
      expect(reducer({ status: 0 }, { type: '' })).toEqual({ status: 0 });
    });

    it('test state = {status: 0} and action type = LOGIN_API_SUCCEEDED with status = true', () => {
      const action = { type: Actions.LOGIN_API_SUCCEEDED, status: true };
      expect(reducer({ status: 0 }, action)).toEqual({ status: 1 });
    });

    it('test state = {status: 0} and action type = LOGIN_API_SUCCEEDED with status = false', () => {
      const action = { type: Actions.LOGIN_API_SUCCEEDED, status: false };
      expect(reducer({ status: 0 }, action)).toEqual({ status: 2 });
    });

    it('test state = {status: 0} and action type = LOGIN_API_FAILED', () => {
      expect(reducer({ status: 0 }, { type: Actions.LOGIN_API_FAILED })).toEqual({ status: -1 });
    });
  });

  describe('#selectors', () => {
    it('gets an object with all individual selectors', () => {
      expect(selectors({})).toHaveProperty('getLoginStatus');
    });

    describe('#getLoginStatus', () => {
      it('returns undefined if status does not exist', () => {
        expect(selectors({}).getLoginStatus()).toEqual(undefined);
      });

      it('returns status if it exists', () => {
        expect(selectors({ status: 1 }).getLoginStatus()).toEqual(1);
      });
    });
  });
});
