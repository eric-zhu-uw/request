import { Actions } from '../platform/constants';

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
  loginApi(username, password)
    .then(res => dispatch({ type: Actions.LOGIN_API_SUCCEEDED, status: res.ok }))
    .catch(() => dispatch({ type: Actions.LOGIN_API_FAILED }));

export const logout = () => ({
  type: Actions.LOGOUT
});
