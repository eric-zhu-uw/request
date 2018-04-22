/* eslint no-undef: 0 */
/* eslint global-require: 0 */
import React from 'react';
import TestRenderer from 'react-test-renderer';
import { LocalStorage, Routes } from '../../../platform/constants';
import { LoginScreen, mapStateToProps, mapDispatchToProps } from '../index';

describe('native/molecules/login/index.js', function() {
  describe('#render', () => {
    beforeEach(() => {
      this.props = {
        validateLoginDispatch: jest.fn(),
        navigation: {},
        status: 0
      };
    });

    it('renders without crashing given required props', () => {
      const component = TestRenderer.create(<LoginScreen {...this.props} />).toJSON();
      expect(component).toBeTruthy();
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
      const component = TestRenderer.create(<LoginScreen {...this.props} />).getInstance();
      component.setState = jest.fn();
      component.componentWillReceiveProps({ status: -1 });

      expect(component.setState).toHaveBeenCalledTimes(1);
      expect(component.setState).toHaveBeenCalledWith({
        message: 'Invalid username or password. Please try again!'
      });
    });

    it('invalid credentials were given to the login API', () => {
      const component = TestRenderer.create(<LoginScreen {...this.props} />).getInstance();
      component.setState = jest.fn();
      component.componentWillReceiveProps({ status: 3 });
      expect(component.setState).toHaveBeenCalledTimes(1);
      expect(component.setState).toHaveBeenCalledWith({
        message: 'Invalid username or password. Please try again!'
      });
    });

    it('valid credentials were given to the login API', () => {
      const component = TestRenderer.create(<LoginScreen {...this.props} />).getInstance();
      component.componentWillReceiveProps({ status: 1 });

      expect(component.props.navigation.navigate).toHaveBeenCalledTimes(1);
      expect(component.props.navigation.navigate).toHaveBeenCalledWith(Routes.LISTTABS);
    });
  });

  describe('#handleLogin', () => {
    beforeEach(() => {
      this.props = {
        validateLoginDispatch: jest.fn(),
        navigation: { navigate: jest.fn() },
        status: 0
      };
    });

    it('expects the SecureStore to have been called Twice on handleLogin', () => {
      const expo = require('expo');
      expo.SecureStore.setItemAsync = jest.fn().mockReturnValue(Promise.resolve('success'));
      const component = TestRenderer.create(<LoginScreen {...this.props} />).getInstance();
      component.setState({ username: 'username', password: 'password' });
      component.handleLogin();
      expect(expo.SecureStore.setItemAsync).toHaveBeenCalledTimes(2);
      expect(expo.SecureStore.setItemAsync).toHaveBeenCalledWith(LocalStorage.USERNAME, 'username');
      expect(expo.SecureStore.setItemAsync).toHaveBeenCalledWith(LocalStorage.PASSWORD, 'password');
    });

    it('expects validateLoginDispatch to have been called Once on successful SecureStore', done => {
      const expo = require('expo');
      expo.SecureStore.setItemAsync = jest.fn().mockReturnValue(Promise.resolve('success'));
      const component = TestRenderer.create(<LoginScreen {...this.props} />).getInstance();
      component.setState({ username: 'username', password: 'password' });
      component.handleLogin();

      Promise.all([
        expo.SecureStore.setItemAsync('', ''),
        expo.SecureStore.setItemAsync('', '')
      ]).then(() => {
        expect(component.props.validateLoginDispatch).toHaveBeenCalledTimes(1);
        expect(component.props.validateLoginDispatch).toHaveBeenCalledWith('username', 'password');
        done();
      });
    });

    it('expects setState to have been called on failed SecureStore', done => {
      const expo = require('expo');
      expo.SecureStore.setItemAsync = jest.fn().mockReturnValue(Promise.reject());
      const component = TestRenderer.create(<LoginScreen {...this.props} />).getInstance();
      component.setState = jest.fn();
      component.handleLogin();

      Promise.all([expo.SecureStore.setItemAsync('', ''), expo.SecureStore.setItemAsync('', '')])
        .then(jest.fn())
        .catch(() => {
          expect(component.setState).toHaveBeenCalledTimes(1);
          expect(component.setState).toHaveBeenCalledWith({
            message: 'An error has occured. Please try again!'
          });
          done();
        });
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
