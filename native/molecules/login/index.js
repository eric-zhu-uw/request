import React from 'react';
import PropTypes from 'prop-types';
import { Button, Text, TextInput, View } from 'react-native';

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '', message: '' };

    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    const { navigation } = this.props;
    const { navigate } = navigation;

    const { username, password } = this.state;

    // will set a cookie if successful
    fetch('http://192.168.1.196:3000/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then(res => {
        if (res.status !== 200) {
          this.setState(JSON.parse(res._bodyText));
        } else {
          navigate('ListTabs');
        }
      })
      .catch();
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
};
