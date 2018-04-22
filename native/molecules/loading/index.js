import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SecureStore } from 'expo';

import { selectors } from '../../reducers_selectors';
import { validateLogin } from '../../action_creators/login';
import { Routes, LocalStorage } from '../../platform/constants';

export class LoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { validateLoginDispatch, navigation } = this.props;
    const { navigate } = navigation;
    const getUsername = SecureStore.getItemAsync(LocalStorage.USERNAME);
    const getPassword = SecureStore.getItemAsync(LocalStorage.PASSWORD);
    Promise.all([getUsername, getPassword])
      .then(res => validateLoginDispatch(res[0], res[1]))
      .catch(() => navigate(Routes.LOGIN));
  }

  componentWillReceiveProps(nextProps) {
    const { navigation } = this.props;
    const { status } = nextProps;
    const { navigate } = navigation;
    if (status === 2 || status === -1) {
      navigate(Routes.LOGIN);
    }

    if (status === 1) {
      navigate(Routes.LISTTABS);
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(LoadingScreen);
