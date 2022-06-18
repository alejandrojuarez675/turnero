import { createReducer, on } from '@ngrx/store';
import { Contexto, Credencial, Paciente, TurnoPaciente, Usuario } from '../../../shared/models/datos.models';
import { turnosFuturos } from '../../mocks/mocks';
import * as ContextoActions from '../actions/contexto.actions';


export const initialState: 
Contexto = {
    token: undefined,
    esAnonimo: true,
    credencial: undefined,
    infoUsuario: undefined,
    pacienteSelected: undefined,
    turnosFuturos: undefined
};

const _setToken = (state: Contexto, newToken: string): Contexto => {
    const stateNew = { ...state };
    stateNew.token = newToken;
    stateNew.esAnonimo = true;
    return stateNew;
};

const _setCredencialUsuario = (state: Contexto, credencialUsuario: Credencial): Contexto => {
    const stateNew = { ...state };
    stateNew.credencial = credencialUsuario;
    return stateNew;
};

const _setUsuario = (state: Contexto, infoUsuario: Usuario) => {
    const stateNew = { ...state };
    stateNew.esAnonimo = false;    
    stateNew.infoUsuario = infoUsuario;
    return stateNew;
};

const _setTurnosFuturos = (state: Contexto, turnosFuturos: TurnoPaciente[]) => {
    const stateNew = { ...state };
    stateNew.turnosFuturos = turnosFuturos;
    return stateNew;
};

const _setPacienteSelected = (state: Contexto, paciente: Paciente) => {
    const stateNew = { ...state };
    stateNew.pacienteSelected = paciente;
    return stateNew;
};

const _contextoReducer = createReducer(initialState,

    on(ContextoActions.cleanStore, () => initialState),

    on(ContextoActions.setToken, (state, { token} ) =>
     _setToken(state, token)),

     on(ContextoActions.setCredencialUsuario, (state, { credencialUsuario } ) =>
     _setCredencialUsuario(state, credencialUsuario)),

    on(ContextoActions.setUsuario, (state, { infoUsuario} ) =>
     _setUsuario(state, infoUsuario)),

    on(ContextoActions.setPacienteSelected, (state, { paciente } ) =>
     _setPacienteSelected(state, paciente)),

     on(ContextoActions.setTurnosPaciente, (state, { turnosFuturos } ) =>
     _setTurnosFuturos(state, turnosFuturos)),
);

export function contextoReducer(state, action) {
    return _contextoReducer(state, action);
}
