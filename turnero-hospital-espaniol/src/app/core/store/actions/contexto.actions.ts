import { createAction, props } from '@ngrx/store';
import { Login } from '../../../shared/models/datos.models';

export const CLEAN_STORE = '[Contexto] - cleanStore';
export const GET_TOKEN = '[Contexto] - getToken';
export const SET_TOKEN = '[Contexto] - setToken';

export const cleanStore = createAction(CLEAN_STORE);

export const getToken = createAction(
    GET_TOKEN,
    props<{ login: Login }>()
);

export const setToken = createAction(
    SET_TOKEN,
    props<{ token: string }>()
);