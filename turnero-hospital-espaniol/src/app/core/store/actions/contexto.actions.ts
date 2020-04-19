import { createAction, props } from '@ngrx/store';
import { BusquedaProfesionalesRequest } from '../../../shared/models/request.models';

export const CLEAN_STORE = '[Reserva] - cleanStore';
export const SET_ESTADO = '[Contexto] - setEstado';

export const cleanStore = createAction(CLEAN_STORE);

export const setEstado = createAction(
    SET_ESTADO,
    props<{ newEstado: number }>()
);