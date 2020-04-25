import { createReducer, on } from '@ngrx/store';
import { Contexto } from '../../../shared/models/datos.models';
import * as ContextoActions from '../actions/contexto.actions';


export const initialState: 
Contexto = {
    estado: 1,
    token: undefined,
};

const _setEstado = (state: Contexto, newEstado: number): Contexto => {
    const stateNew = { ...state };
    stateNew.estado = newEstado;
    return stateNew;
};

const _setToken = (state: Contexto, newToken: string): Contexto => {
    const stateNew = { ...state };
    stateNew.token = newToken;
    return stateNew;
};

const _contextoReducer = createReducer(initialState,

    on(ContextoActions.setEstado, (state, { newEstado }) =>
     _setEstado(state, newEstado)),
    
    on(ContextoActions.setToken, (state, { token} ) =>
     _setToken(state, token)),

);

export function contextoReducer(state, action) {
    return _contextoReducer(state, action);
}
