import * as types from '../types';

const initialState = {
  botaoClicado: false,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.LOGIN_SUCCESS: {
      console.log('Sucesso');
      const newState = { ...state };
      newState.botaoClicado = !newState.botaoClicado;
      return newState;
    }
    case types.LOGIN_REQUEST: {
      console.log('Estou fazendo a requisição');
      return state;
    }
    case types.LOGIN_FAILURE: {
      console.log('Deu ruim');
      return state;
    }

    default:
      return state;
  }
}
