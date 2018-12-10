import { SET_FROM_USER } from '../actions/types';

const fromInitialState = {
  name: '',
  lastSeen: Date.now()
};

export default (state = fromInitialState, action) => {
  switch (action.type) {
    case SET_FROM_USER:
      return { ...state, ...action.fromUserObj };
    default:
      return state;
  }
};