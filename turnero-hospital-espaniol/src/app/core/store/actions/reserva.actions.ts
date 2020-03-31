import { props, createAction } from "@ngrx/store";
import { ReservaTurnoRequest } from "../../../shared/models/request.models";
import { Turno } from "../../../shared/models/datos.models";

export const RESERVA_TURNO = '[Form] - ReservaTurno ';
export const SET_TURNO_SELECTED = '[Calendar] - setTurnoSelected';

export const reservaTurno = createAction(
    RESERVA_TURNO,
    props<{filter: ReservaTurnoRequest}>()
);

export const setTurnoSelected = createAction(
    SET_TURNO_SELECTED,
    props<{ turnoSelected: Turno }>()
);