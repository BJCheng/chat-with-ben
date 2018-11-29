import { CHANGE_INPUT, APPEND_MESSAGE, CLEAR_INPUT, REDIRECT_TO_LOGIN, SET_TO_USER } from './types';
import axios from 'axios';

const apiUrl = global.__apiUrl__;

export const changeInput = (text) => ({
  type: CHANGE_INPUT,
  value: text
});

export const appendMessageToList = (text) => ({
  type: APPEND_MESSAGE,
  value: text
});

export const sendMessageAsync = (text) => () => {
  return axios.post(`${apiUrl}/send-message`, { msg: text });
};

export const clearInput = () => ({
  type: CLEAR_INPUT
});

export const loadMessages = (dispatch, getState) => {
  return axios.get(`${apiUrl}`);
};

export const getUser = (name) => (dispatch, getState) => {
  return axios.get(`${apiUrl}/user/${name}`).then(({ data }) => data);
};

export const redirectToLogin = () => ({
  type: REDIRECT_TO_LOGIN
});

export const setToUser = (toUserObj) => ({
  type: SET_TO_USER,
  name: toUserObj.name,
  lastSeen: toUserObj.lastSeen,
});