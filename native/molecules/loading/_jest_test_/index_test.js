/* eslint no-undef: 0 */
/* eslint global-require: 0 */
import React from 'react';
import TestRenderer from 'react-test-renderer';
import { LocalStorage, Routes } from '../../../platform/constants';
import { LoadingScreen, mapStateToProps, mapDispatchToProps } from '../index';

describe('native/molecules/loading/index.js', function() {
  describe('#render', () => {
    beforeEach(() => {
      this.props = {
        validateLoginDispatch: jest.fn(),
        navigation: {},
        status: 0
      };
    });

    it('renders without crashing given required props', () => {
      const component = TestRenderer.create(<LoadingScreen {...this.props} />).toJSON();
      expect(component).toBeTruthy();
    });
  });

  describe('#componentDidMount', () => {
    beforeEach(() => {
      this.props = {
        validateLoginDispatch: jest.fn(),
        navigation: { navigate: jest.fn() },
        status: 0
      };
    });

    it('expects the SecureStore to have been called Twice on componentDidMount', () => {
      const expo = require('expo');
      expo.SecureStore.getItemAsync = jest.fn().mockReturnValue(Promise.resolve('success'));
      TestRenderer.create(<LoadingScreen {...this.props} />).getInstance();

      expect(expo.SecureStore.getItemAsync).toHaveBeenCalledTimes(2);
      expect(expo.SecureStore.getItemAsync).toHaveBeenCalledWith(LocalStorage.USERNAME);
      expect(expo.SecureStore.getItemAsync).toHaveBeenCalledWith(LocalStorage.PASSWORD);
    });

    it('expects validateLoginDispatch to have been called Once on successful SecureStore', done => {
      const expo = require('expo');
      expo.SecureStore.getItemAsync = jest.fn().mockReturnValue(Promise.resolve('success'));
      const component = TestRenderer.create(<LoadingScreen {...this.props} />).getInstance();

      Promise.all([expo.SecureStore.getItemAsync(), expo.SecureStore.getItemAsync()]).then(res => {
        expect(component.props.validateLoginDispatch).toHaveBeenCalledTimes(1);
        expect(component.props.validateLoginDispatch).toHaveBeenCalledWith(res[0], res[1]);
        done();
      });
    });

    it('expects navigate to have been called on failed SecureStore', done => {
      const expo = require('expo');
      expo.SecureStore.getItemAsync = jest.fn().mockReturnValue(Promise.reject());
      const component = TestRenderer.create(<LoadingScreen {...this.props} />).getInstance();

      Promise.all([expo.SecureStore.getItemAsync(), expo.SecureStore.getItemAsync()])
        .then(jest.fn())
        .catch(() => {
          expect(component.props.navigation.navigate).toHaveBeenCalledTimes(1);
          expect(component.props.navigation.navigate).toHaveBeenCalledWith(Routes.LOGIN);
          done();
        });
    });
  });

  describe('#componentWillReceiveProps', () => {
    beforeEach(() => {
      this.props = {
        validateLoginDispatch: jest.fn(),
        navigation: { navigate: jest.fn() },
        status: 0
      };
    });

    it('login API resulted in a server error', () => {
      const component = TestRenderer.create(<LoadingScreen {...this.props} />).getInstance();
      component.componentWillReceiveProps({ status: -1 });

      expect(component.props.navigation.navigate).toHaveBeenCalledTimes(1);
      expect(component.props.navigation.navigate).toHaveBeenCalledWith(Routes.LOGIN);
    });

    it('invalid credentials were given to the login API', () => {
      const component = TestRenderer.create(<LoadingScreen {...this.props} />).getInstance();
      component.componentWillReceiveProps({ status: 2 });

      expect(component.props.navigation.navigate).toHaveBeenCalledTimes(1);
      expect(component.props.navigation.navigate).toHaveBeenCalledWith(Routes.LOGIN);
    });

    it('valid credentials were given to the login API', () => {
      const component = TestRenderer.create(<LoadingScreen {...this.props} />).getInstance();
      component.componentWillReceiveProps({ status: 1 });

      expect(component.props.navigation.navigate).toHaveBeenCalledTimes(1);
      expect(component.props.navigation.navigate).toHaveBeenCalledWith(Routes.LISTTABS);
    });
  });

  describe('#mapStateToProps', () => {
    it('correctly returns all props', () => {
      expect(mapStateToProps({})).toHaveProperty('status');
    });

    it('correctly returns all status prop', () => {
      const state = { login: { status: 0 } };
      expect(mapStateToProps(state)).toEqual({ status: 0 });
    });
  });

  describe('#mapDispatchToProps', () => {
    beforeEach(() => {
      this.dispatch = jest.fn();
    });

    it('correctly returns all props', () => {
      expect(mapDispatchToProps(this.dispatch)).toHaveProperty('validateLoginDispatch');
    });

    it('correctly calls validateLoginDispatch prop', () => {
      const actionCreator = require('../../../action_creators/login');
      const { validateLoginDispatch } = mapDispatchToProps(this.dispatch);

      actionCreator.validateLogin = jest.fn();
      actionCreator.validateLogin.mockReturnValue('action payload');
      validateLoginDispatch('user', 'pass');

      expect(this.dispatch).toHaveBeenCalledTimes(1);
      expect(this.dispatch).toHaveBeenCalledWith('action payload');
      expect(actionCreator.validateLogin).toHaveBeenCalledTimes(1);
      expect(actionCreator.validateLogin).toHaveBeenCalledWith('user', 'pass');
    });
  });
});
