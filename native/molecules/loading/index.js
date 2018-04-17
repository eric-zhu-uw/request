import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SecureStore } from 'expo';

import { selectors } from '../../reducers_selectors';
import { validateLogin } from '../../action_creators/login';

class LoadingScreen extends React.Component {
  static getDerivedStateFromProps(nextProps) {
    const { navigation, status } = nextProps;
    const { navigate } = navigation;
    if (status === 1) {
      navigate('LoginScreen');
    }

    if (status === 2) {
      navigate('ListTabs');
    }

    return {};
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { validateLoginDispatch } = this.props;
    // const p1 = SecureStore.setItemAsync('username', 'z');
    // const p2 = SecureStore.setItemAsync('password', 'password');
    let username = '';
    let password = '';
    const p3 = SecureStore.getItemAsync('username');
    const p4 = SecureStore.getItemAsync('password');
    // const p = Promise.all([p1, p2]).then(() => {
    //   const p3 = SecureStore.getItemAsync('username');
    //   const p4 = SecureStore.getItemAsync('password');
    //
    //   return Promise.all([p3, p4]);
    // });

    Promise.all([p3, p4]).then(res => {
      username = res[0];
      password = res[1];
      validateLoginDispatch(username, password);
    });
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>LOADING SCREEN</Text>
      </View>
    );
  }
}

LoadingScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  validateLoginDispatch: PropTypes.func.isRequired,
  status: PropTypes.number.isRequired
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

export default connect(mapStateToProps, mapDispatchToProps)(LoadingScreen);
