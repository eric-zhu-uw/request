import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Text, TextInput, View } from 'react-native';

import { validateLogin } from '../../action_creators/login';

class LoginScreen extends React.Component {
  static getDerivedStateFromProps(nextProps) {
    const { navigation, status } = nextProps;
    const { navigate } = navigation;

    if (status === 2) {
      navigate('ListTabs');
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
    validateLoginDispatch(username, password);
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
  navigation: PropTypes.object.isRequired,
  validateLoginDispatch: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  validateLoginDispatch: (username, password) => dispatch(validateLogin(username, password))
});

export default connect(null, mapDispatchToProps)(LoginScreen);
