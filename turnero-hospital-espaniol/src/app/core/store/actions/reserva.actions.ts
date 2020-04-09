import { createAction, props } from '@ngrx/store';
import { Paciente, Reserva, Turno } from '../../../shared/models/datos.models';
import { ReservaTurnoRequest } from '../../../shared/models/request.models';

export const CLEAN_STORE = '[Reserva] - cleanStore';
export const RESERVA_TURNO = '[Reserva] - ReservaTurno';
export const SET_TURNO_SELECTED = '[Reserva] - setTurnoSelected';
export const SET_RESERVA = '[API] - setReservaSelected ';
export const GET_RESERVA = '[Reserva] - getReservaSelected ';
export const SET_PACIENTE = '[Reserva] - setPaciente ';

export const cleanStore = createAction(CLEAN_STORE);

export const reservaTurno = createAction(
    RESERVA_TURNO,
    props<{filter: ReservaTurnoRequest}>()
);

export const setTurnoSelected = createAction(
    SET_TURNO_SELECTED,
    props<{ turnoSelected: Turno }>()
);

export const setReservaSelected = createAction(
    SET_RESERVA,
    props<{ reservaSelected: Reserva }>()
);

export const getReservaSelected = createAction(
    GET_RESERVA,
    props<{filter: Reserva}>()
);

export const setPaciente = createAction(
    SET_PACIENTE,
    props<{paciente: Paciente}>()
);
