/* eslint no-undef: 0 */
/* eslint global-require: 0 */
import React from 'react';
import TestRenderer from 'react-test-renderer';
import { Routes } from '../../../platform/constants';
import { ProfileScreen, mapStateToProps, mapDispatchToProps } from '../index';

describe('native/molecules/profile/index.js', () => {
  describe('#render', () => {
    beforeEach(() => {
      this.props = {
        logoutDispatch: jest.fn(),
        navigation: {},
        status: 0
      };
    });

    it('renders without crashing given required props', () => {
      const component = TestRenderer.create(<ProfileScreen {...this.props} />).toJSON();
      expect(component).toBeTruthy();
    });
  });

  describe('#componentWillReceiveProps', () => {
    beforeEach(() => {
      this.props = {
        logoutDispatch: jest.fn(),
        navigation: { navigate: jest.fn() },
        status: 0
      };
    });

    it('logoutDispatch changed the login status to 0', () => {
      const component = TestRenderer.create(<ProfileScreen {...this.props} />).getInstance();
      component.componentWillReceiveProps({ status: 0 });

      expect(component.props.navigation.navigate).toHaveBeenCalledTimes(1);
      expect(component.props.navigation.navigate).toHaveBeenCalledWith(Routes.LOGIN);
    });

    it('login status is 1 indicating user is logged in', () => {
      const component = TestRenderer.create(<ProfileScreen {...this.props} />).getInstance();
      component.componentWillReceiveProps({ status: 1 });

      expect(component.props.navigation.navigate).toHaveBeenCalledTimes(0);
    });
  });

  describe('#mapStateToProps', () => {
    it('correctly returns all props', () => {
      expect(mapStateToProps({})).toHaveProperty('status');
    });

    it('correctly returns all status prop', () => {
      const state = { login: { status: 0 } };
      expect(mapStateToProps(state)).toMatchObject({ status: 0 });
    });
  });

  describe('#openSettingsTabs', () => {
    beforeEach(() => {
      this.props = {
        logoutDispatch: jest.fn(),
        navigation: { navigate: jest.fn() },
        status: 0
      };
    });

    it('sets settingsTabs state = true & other tabs to false', () => {
      const component = TestRenderer.create(<ProfileScreen {...this.props} />).getInstance();
      component.openSettingsTabs();
      expect(component.state.settingsTabs).toBe(true);
    });
  });

  describe('#closeSettingsTab', () => {
    beforeEach(() => {
      this.props = {
        logoutDispatch: jest.fn(),
        navigation: { navigate: jest.fn() },
        status: 0
      };
    });

    it('sets settingsTabs state = false', () => {
      const component = TestRenderer.create(<ProfileScreen {...this.props} />).getInstance();
      component.closeSettingsTabs();
      expect(component.state.settingsTabs).toBe(false);
    });
  });

  describe('#mapDispatchToProps', () => {
    beforeEach(() => {
      this.dispatch = jest.fn();
    });

    it('correctly returns all props', () => {
      expect(mapDispatchToProps(this.dispatch)).toHaveProperty('logoutDispatch');
    });

    it('correctly calls validateLoginDispatch prop', () => {
      const actionCreator = require('../../../action_creators/login');
      const { logoutDispatch } = mapDispatchToProps(this.dispatch);

      actionCreator.logout = jest.fn();
      actionCreator.logout.mockReturnValue('action payload');
      logoutDispatch();

      expect(this.dispatch).toHaveBeenCalledTimes(1);
      expect(this.dispatch).toHaveBeenCalledWith('action payload');
      expect(actionCreator.logout).toHaveBeenCalledTimes(1);
      expect(actionCreator.logout).toHaveBeenCalledWith();
    });
  });
});
