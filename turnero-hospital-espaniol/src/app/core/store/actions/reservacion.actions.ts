import { createAction, props } from '@ngrx/store';
import { Reserva } from '../../../shared/models/datos.models';

export const CLEAN_STORE = '[Reservacion] - cleanStore';
export const SET_RESERVA = '[Reservacion] - setReservaSelected ';

export const cleanStore = createAction(CLEAN_STORE);

export const setReservaSelected = createAction(
    SET_RESERVA,
    props<{ reserva: Reserva }>()
);

