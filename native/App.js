import React from 'react';
import { Provider } from 'react-redux';

import store from './store';
import AppRouter from './molecules/navigation';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );
  }
}
