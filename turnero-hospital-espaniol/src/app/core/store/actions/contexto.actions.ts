import { createAction, props } from '@ngrx/store';
import { Credencial, Login, Paciente, TurnoPaciente, Usuario } from '../../../shared/models/datos.models';

export const CLEAN_STORE = '[Contexto] - cleanStore';
export const GET_TOKEN = '[Contexto] - getToken';
export const SET_TOKEN = '[Contexto] - setToken';
export const GET_CREDENCIALUSUARIO = '[Contexto] - getCredencialUsuario';
export const SET_CREDENCIALUSUARIO = '[Contexto] - setCredencialUsuario';
export const GET_USUARIO = '[Contexto] - getUsuario';
export const SET_USUARIO = '[Contexto] - setUsuario';
export const GET_PACIENTESELECTED = '[Contexto] - getPacienteSelected';
export const SET_PACIENTESELECTED = '[Contexto] - setPacienteSelected';
export const GET_TURNOSPACIENTE = '[Contexto] - getTurnosPaciente';
export const SET_TURNOSPACIENTE = '[Contexto] - setTurnosPacientes';


export const cleanStore = createAction(CLEAN_STORE);

export const getToken = createAction(
    GET_TOKEN,
    props<{ login: Login }>()
);

export const setToken = createAction(
    SET_TOKEN,
    props<{ token: string }>()
);

export const getCredencialUsuario = createAction(
    GET_CREDENCIALUSUARIO,
    props<{ credencialUsuario: Credencial }>()
);

export const setCredencialUsuario = createAction(
    SET_CREDENCIALUSUARIO,
    props<{ credencialUsuario: Credencial }>()
);

export const getUsuario = createAction(
    GET_USUARIO,
    props<{ credencialUsuario: Credencial }>()
);

export const setUsuario = createAction(
    SET_USUARIO,
    props<{ infoUsuario: Usuario }>()
);

export const getPacienteSelected = createAction(
    GET_PACIENTESELECTED,
);

export const setPacienteSelected = createAction(
    SET_PACIENTESELECTED,
    props<{ paciente: Paciente }>()
);


export const getTurnosPaciente = createAction(
    GET_TURNOSPACIENTE,
);

export const setTurnosPaciente = createAction(
    SET_TURNOSPACIENTE,
    props<{ turnosFuturos: TurnoPaciente[]}>()
);