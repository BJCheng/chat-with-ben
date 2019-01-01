import {
  ON_ID_CHANGE, ON_PASSWORD_CHANGE, SWITCH_TO_SIGN_IN,
  SWITCH_TO_CREATE_ACCOUNT, LOGIN_READY
} from '../actions/types';
import { api, apiErrorHandler } from '../actions/api';
import { setAuth } from './auth';
import { setFromUser } from '.';
import LocalStorage from '../utils/local-storage';
import setupClientSocket from '../utils/setup-client-socket';

export const onPasswordChange = (value) => ({
  type: ON_PASSWORD_CHANGE,
  value
});

export const onIdChange = (value) => ({
  type: ON_ID_CHANGE,
  value
});

export const createUser = async (dispatch, getState) => {
  const state = getState();
  const { id, password } = state.login;
  const result = await api.post(`/user/${id}`, { password }).catch(err => { console.error(JSON.stringify(err)); });
  dispatch(setAuth(result.data));
  dispatch(setFromUser(result.data));
  LocalStorage.setObj('auth', result.data);
  LocalStorage.setObj('from', result.data);
  setupClientSocket(id, dispatch);
};

export const switchToSignIn = () => ({
  type: SWITCH_TO_SIGN_IN
});

export const switchToCreateAccount = () => ({
  type: SWITCH_TO_CREATE_ACCOUNT
});

export const loginReady = (ready) => ({
  type: LOGIN_READY,
  ready
});

export const signIn = async (dispatch, getState) => {
  const state = getState();
  const { id, password } = state.login;
  const result = await api.post('/auth', { id, password }).catch((err) => {
    //TODO
    dispatch(renderErrorMessage(err.message));
  });
  // console.log('!!!!!!!!!!!after post auth');
  dispatch(setAuth(result.data));
  // console.log('!!!!!!!!!!!after set auth');
  dispatch(setFromUser(result.data));
  LocalStorage.setObj('auth', result.data);
  LocalStorage.setObj('from', result.data);
  setupClientSocket(id, dispatch);
  // console.log('!!!!!!!!!!!finished setting local storage after post auth');
  // console.log(`!!!!!!!!!!!from id in local storage: ${LocalStorage.getObj('from').id}`);
  dispatch(loginReady(true));
};