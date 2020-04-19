import { createReducer, on } from '@ngrx/store';
import { Contexto } from '../../../shared/models/datos.models';
import * as ContextoActions from '../actions/contexto.actions';


export const initialState: 
Contexto = {
    estado: 1,
};

const _setEstado = (state: Contexto, newEstado: number): Contexto => {
    const stateNew = { ...state };
    stateNew.estado = newEstado;
    return stateNew;
};

const _contextoReducer = createReducer(initialState,

    on(ContextoActions.setEstado, (state, { newEstado }) =>
     _setEstado(state, newEstado)),

);

export function contextoReducer(state, action) {
    return _contextoReducer(state, action);
}
