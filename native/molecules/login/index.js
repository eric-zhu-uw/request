import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Text, TextInput, View } from 'react-native';
import { SecureStore } from 'expo';

import { validateLogin } from '../../action_creators/login';
import { selectors } from '../../reducers_selectors';
import { Routes, LocalStorage } from '../../platform/constants';

export class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '', message: '' };
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { navigation } = this.props;
    const { status } = nextProps;
    const { navigate } = navigation;
    if (status === 1) {
      navigate(Routes.LISTTABS);
    } else {
      this.setState({ message: 'Invalid username or password. Please try again!' });
    }
  }

  handleLogin() {
    const { validateLoginDispatch } = this.props;

    const { username, password } = this.state;
    const setUsername = SecureStore.setItemAsync(LocalStorage.USERNAME, username);
    const setPassword = SecureStore.setItemAsync(LocalStorage.PASSWORD, password);

    Promise.all([setUsername, setPassword])
      .then(() => {
        validateLoginDispatch(username, password);
      })
      .catch(() => {
        this.setState({ message: 'An error has occured. Please try again!' });
      });
  }

  render() {
    const { message } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Login</Text>
        <TextInput
          style={{ height: 40 }}
          placeholder="Username"
          maxLength={40}
          onChangeText={username => this.setState({ username, message: '' })}
        />
        <TextInput
          style={{ height: 40 }}
          placeholder="Password"
          maxLength={40}
          onChangeText={password => this.setState({ password, message: '' })}
        />
        <Button title="Login" onPress={this.handleLogin} />
        <Text style={{ paddingTop: 5 }}>{message}</Text>
      </View>
    );
  }
}

LoginScreen.propTypes = {
  validateLoginDispatch: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  status: PropTypes.number.isRequired
};

export const mapStateToProps = state => {
  const { getLoginSelectors } = selectors(state);
  const { getLoginStatus } = getLoginSelectors();
  const status = getLoginStatus();

  return { status };
};

export const mapDispatchToProps = dispatch => ({
  validateLoginDispatch: (username, password) => dispatch(validateLogin(username, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
