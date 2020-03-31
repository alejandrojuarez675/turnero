import { props, createAction } from "@ngrx/store";
import { ReservaTurnoRequest } from "../../../shared/models/request.models";
import { Turno, Reserva } from "../../../shared/models/datos.models";

export const RESERVA_TURNO = '[Form] - ReservaTurno ';
export const SET_TURNO_SELECTED = '[Calendar] - setTurnoSelected';
export const SET_RESERVA = '[Form] - setReservaSelected ';

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