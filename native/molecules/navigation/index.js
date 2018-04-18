import { SwitchNavigator, TabNavigator } from 'react-navigation';

import { Routes } from '../../platform/constants';
import LoadingScreen from '../loading';
import LoginScreen from '../login';
import ProfileScreen from '../profile';
import RequestScreen from '../request';

const ListTabs = TabNavigator(
  {
    [Routes.REQUEST]: { screen: RequestScreen },
    [Routes.PROFILE]: { screen: ProfileScreen }
  },
  {
    swipeEnabled: true
  }
);

const AppRouter = SwitchNavigator(
  {
    [Routes.LOADING]: { screen: LoadingScreen },
    [Routes.LOGIN]: { screen: LoginScreen },
    [Routes.LISTTABS]: { screen: ListTabs }
  },
  {
    initialRouteName: Routes.LOADING,
    headerMode: 'none'
  }
);

export default AppRouter;
