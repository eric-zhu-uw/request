import { StackNavigator, TabNavigator } from 'react-navigation';

import LoadingScreen from '../loading';
import LoginScreen from '../login';
import ProfileScreen from '../profile';
import RequestScreen from '../request';

const ListTabs = TabNavigator(
  {
    RequestScreen: {
      screen: RequestScreen
    },

    ProfileScreen: {
      screen: ProfileScreen
    }
  },
  {
    swipeEnabled: true
  }
);

const AppRouter = StackNavigator(
  {
    LoadingScreen: { screen: LoadingScreen },
    LoginScreen: { screen: LoginScreen },
    ListTabs: { screen: ListTabs }
  },
  {
    initialRouteName: 'LoadingScreen',
    headerMode: 'none'
  }
);

export default AppRouter;
