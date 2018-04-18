import React from 'react';
import { Text, View, Button } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { logout } from '../../action_creators/login';
import { selectors } from '../../reducers_selectors';
import { Routes } from '../../platform/constants';

class ProfileScreen extends React.Component {
  static getDerivedStateFromProps(nextProps) {
    const { navigation, status } = nextProps;
    const { navigate } = navigation;
    if (status === 0) {
      navigate(Routes.LOGIN);
    }

    return {};
  }

  constructor(props) {
    super(props);
    this.state = {
      settingsTabs: false
    };

    this.openSettingsTabs = this.openSettingsTabs.bind(this);
    this.closeSettingsTabs = this.closeSettingsTabs.bind(this);
    this.logout = this.logout.bind(this);
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
    logoutDispatch();
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
  logoutDispatch: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  const { getLoginSelectors } = selectors(state);
  const { getLoginStatus } = getLoginSelectors();
  const status = getLoginStatus();

  return { status };
};

const mapDispatchToProps = dispatch => ({
  logoutDispatch: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
