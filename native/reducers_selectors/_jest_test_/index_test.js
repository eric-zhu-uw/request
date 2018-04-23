/* eslint no-undef: 0 */
/* eslint global-require: 0 */
import { selectors } from '../';

describe('native/reducers_selectors/index.js', () => {
  describe('#selectors', () => {
    it('gets an object with all individual selectors', () => {
      const selector = selectors({});
      expect(selector).toHaveProperty('getActiveRequestsSelectors');
      expect(selector).toHaveProperty('getLoginSelectors');
      expect(selector.getActiveRequestsSelectors).toBeInstanceOf(Function);
      expect(selector.getLoginSelectors).toBeInstanceOf(Function);
    });

    describe('#getActiveRequestsSelectors', () => {
      it('getActiveRequestsSelectors is called with the correct portion of state', () => {
        const active_requests = require('../active_requests');
        active_requests.selectors = jest.fn();
        selectors({ activeRequests: { test: 'test' } }).getActiveRequestsSelectors();
        expect(active_requests.selectors).toHaveBeenCalledWith({ test: 'test' });
      });
    });

    describe('#getLoginSelectors', () => {
      it('getLoginSelectors is called with the correct portion of state', () => {
        const login = require('../login');
        login.selectors = jest.fn();
        selectors({ login: { test: 'test' } }).getLoginSelectors();
        expect(login.selectors).toHaveBeenCalledWith({ test: 'test' });
      });
    });
  });
});
