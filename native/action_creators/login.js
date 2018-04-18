import { SecureStore } from 'expo';

import { Actions, LocalStorage } from '../platform/constants';

function loginApi(username, password) {
  return fetch('http://192.168.1.196:3000/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  });
}

export const validateLogin = (username, password) => dispatch =>
  loginApi(username, password).then(res => {
    dispatch({
      type: Actions.LOGIN_API_REQUEST,
      status: res.ok
    });
  });

export const logout = () => dispatch => {
  const setUsername = SecureStore.setItemAsync(LocalStorage.USERNAME, '');
  const setPassword = SecureStore.setItemAsync(LocalStorage.PASSWORD, '');

  return Promise.all([setUsername, setPassword]).then(() => {
    dispatch({ type: Actions.LOGOUT });
  });
};
