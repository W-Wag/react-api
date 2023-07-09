import * as types from '../types';

export function BotaoClickedRequest() {
  return {
    type: types.LOGIN_REQUEST,
  };
}
export function BotaoClickedSuccess() {
  return {
    type: types.LOGIN_SUCCESS,
  };
}
export function BotaoClickedFailure() {
  return {
    type: types.LOGIN_FAILURE,
  };
}
