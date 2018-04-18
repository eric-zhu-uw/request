import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Text, TextInput, View } from 'react-native';
import { SecureStore } from 'expo';

import { validateLogin } from '../../action_creators/login';
import { selectors } from '../../reducers_selectors';
import { Routes, LocalStorage } from '../../platform/constants';

class LoginScreen extends React.Component {
  static getDerivedStateFromProps(nextProps) {
    const { navigation, status } = nextProps;
    const { navigate } = navigation;
    if (status === 1) {
      navigate(Routes.LISTTABS);
    }

    return {};
  }

  constructor(props) {
    super(props);
    this.state = { username: '', password: '', message: '' };
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    const { validateLoginDispatch } = this.props;

    const { username, password } = this.state;
    const setUsername = SecureStore.setItemAsync(LocalStorage.USERNAME, username);
    const setPassword = SecureStore.setItemAsync(LocalStorage.PASSWORD, password);

    Promise.all([setUsername, setPassword]).then(() => {
      validateLoginDispatch(username, password);
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
          onChangeText={username => this.setState({ username })}
        />
        <TextInput
          style={{ height: 40 }}
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
        />
        <Button title="Login" onPress={this.handleLogin} />
        <Text style={{ paddingTop: 5 }}>{message}</Text>
      </View>
    );
  }
}

LoginScreen.propTypes = {
  validateLoginDispatch: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  const { getLoginSelectors } = selectors(state);
  const { getLoginStatus } = getLoginSelectors();
  const status = getLoginStatus();

  return { status };
};

const mapDispatchToProps = dispatch => ({
  validateLoginDispatch: (username, password) => dispatch(validateLogin(username, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
