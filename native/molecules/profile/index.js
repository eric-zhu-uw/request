import React from 'react';
import { Text, View, Button } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SecureStore } from 'expo';

import { logout } from '../../action_creators/login';
import { selectors } from '../../reducers_selectors';
import { Routes, LocalStorage } from '../../platform/constants';

export class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      settingsTabs: false
    };

    this.openSettingsTabs = this.openSettingsTabs.bind(this);
    this.closeSettingsTabs = this.closeSettingsTabs.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { navigation } = this.props;
    const { status } = nextProps;
    const { navigate } = navigation;
    if (status === 0) {
      navigate(Routes.LOGIN);
    }
  }

  openSettingsTabs() {
    this.setState({
      settingsTabs: true
    });
  }

  closeSettingsTabs() {
    this.setState({
      settingsTabs: false
    });
  }

  logout() {
    const { logoutDispatch } = this.props;
    const setUsername = SecureStore.setItemAsync(LocalStorage.USERNAME, '');
    const setPassword = SecureStore.setItemAsync(LocalStorage.PASSWORD, '');
    Promise.all([setUsername, setPassword]).then(() => logoutDispatch()); // TODO: on failure, retry
  }

  render() {
    const { settingsTabs } = this.state;
    if (settingsTabs) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Button onPress={this.logout} title="Logout" accessibilityLabel="Logout of Request" />
        </View>
      );
    }

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Profile Screen</Text>
        <Button
          onPress={this.openSettingsTabs}
          title="Settings"
          style={{ backgroundColor: 'white' }}
          accessibilityLabel="Open Settings Tabs"
        />
      </View>
    );
  }
}

ProfileScreen.propTypes = {
  logoutDispatch: PropTypes.func.isRequired,
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
  logoutDispatch: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
