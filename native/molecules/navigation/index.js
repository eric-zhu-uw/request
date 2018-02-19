import { StackNavigator, TabNavigator } from 'react-navigation';

import LoginScreen from '../login';
import ProfileScreen from '../profile';
import RequestScreen from '../request';

const ListTabs = TabNavigator(
  {
    RequestScreen: {
      screen: RequestScreen,
    },

    ProfileScreen: {
      screen: ProfileScreen,
    },
  },
  {
    swipeEnabled: true,
  },
);

const AppRouter = StackNavigator(
  {
    LoginScreen: { screen: LoginScreen },
    ListTabs: { screen: ListTabs },
  },
  {
    initialRouteName: 'LoginScreen',
    headerMode: 'none',
  },
);

export default AppRouter;
