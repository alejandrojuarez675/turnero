import { props, createAction } from "@ngrx/store";
import { ReservaTurnoRequest } from "../../../shared/models/request.models";
import { Turno, Reserva, ReservaFormulario, Paciente } from "../../../shared/models/datos.models";

export const RESERVA_TURNO = '[Reserva] - ReservaTurno';
export const SET_TURNO_SELECTED = '[Calendar] - setTurnoSelected';
export const SET_RESERVA = '[Reserva] - setReservaSelected ';
export const GET_RESERVA = '[Reserva] - getReservaSelected ';
export const SET_PACIENTE = '[Reserva] - setPaciente ';


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