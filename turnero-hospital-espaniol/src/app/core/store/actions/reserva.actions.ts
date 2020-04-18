import { createAction, props } from '@ngrx/store';
import { Paciente, Reserva, Turno } from '../../../shared/models/datos.models';
import { ReservaTurnoRequest, ConfirmacionTurnoRequest } from '../../../shared/models/request.models';

export const CLEAN_STORE = '[Reserva] - cleanStore';
export const RESERVA_TURNO = '[Reserva] - ReservaTurno';
export const SET_TURNO_SELECTED = '[Reserva] - setTurnoSelected';
export const GET_RESERVA = '[Reserva] - getReservaSelected ';
export const SET_PACIENTE = '[Reserva] - setPaciente ';
export const RETRIEVE_TURNO = '[Reserva] - retrieveTurno';
export const SET_TURNO = '[Reserva] - setTurno';

export const cleanStore = createAction(CLEAN_STORE);

export const reservaTurno = createAction(
    RESERVA_TURNO,
    props<{filter: ReservaTurnoRequest}>()
);

export const setTurnoSelected = createAction(
    SET_TURNO_SELECTED,
    props<{ turnoSelected: Turno }>()
);

export const getReservaSelected = createAction(
    GET_RESERVA,
    props<{filter: Reserva}>()
);

export const setPaciente = createAction(
    SET_PACIENTE,
    props<{paciente: Paciente}>()
);

export const retrieveTurno = createAction(
    RETRIEVE_TURNO,
    props<{reserva: ConfirmacionTurnoRequest}>()
);

export const setTurno = createAction(
    SET_TURNO,
    props<{turno: Turno}>()
)