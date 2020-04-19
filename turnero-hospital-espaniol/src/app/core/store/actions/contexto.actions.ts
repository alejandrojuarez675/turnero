import { createAction, props } from '@ngrx/store';
import { BusquedaProfesionalesRequest } from '../../../shared/models/request.models';

export const SET_ESTADO = '[Contexto] - setEstado';

export const setEstado = createAction(
    SET_ESTADO,
    props<{ newEstado: number }>()
);